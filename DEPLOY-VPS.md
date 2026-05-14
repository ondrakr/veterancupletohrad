# Nasazení Veterán Cup na VPS (Wedos, Hetzner, atd.)

Přesný postup pro nasazení Next.js aplikace s MySQL na Linux VPS (Ubuntu/Debian).

---

## 1. Připojení na VPS

```bash
ssh root@TVE_IP_ADRESA
```

(Případně `ssh uzivatel@IP` – záleží na tom, co ti hosting poskytne.)

---

## 2. Aktualizace systému

```bash
apt update && apt upgrade -y
```

---

## 3. Instalace Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # mělo by ukázat v20.x.x
```

---

## 4. Instalace MySQL

```bash
apt install -y mysql-server
systemctl start mysql
systemctl enable mysql
```

**Zabezpečení MySQL:**

```bash
mysql_secure_installation
```

- Zadej heslo pro root (nebo Enter pokud žádné není)
- Odpověz: `Y` na změnu hesla, `Y` na odstranění anonymních uživatelů, `Y` na zakázání remote root loginu, `Y` na odstranění test DB, `Y` na reload pravidel

**Vytvoření databáze a uživatele:**

```bash
mysql -u root -p
```

V MySQL konzoli:

```sql
CREATE DATABASE veterancup CHARACTER SET utf8mb4 COLLATE utf8mb4_czech_ci;
CREATE USER 'veterancup'@'localhost' IDENTIFIED BY 'TvojeSilneHeslo123';
GRANT ALL PRIVILEGES ON veterancup.* TO 'veterancup'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

(Schema importuješ v kroku 8 po nahrání projektu.)

---

## 5. Instalace nginx

```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

---

## 6. Instalace PM2 (správce Node.js procesů)

```bash
npm install -g pm2
```

---

## 7. Nahrání projektu na server

**Možnost A – přes Git (doporučeno):**

```bash
apt install -y git
cd /var/www
git clone https://github.com/TVUJ_USER/TVUJ_REPO.git veteran-cup
cd veteran-cup
```

**Možnost B – přes SCP (z tvého počítače):**

Na svém počítači:

```bash
scp -r /cesta/k/veteran-cup-next root@TVE_IP:/var/www/veteran-cup
```

Pak na serveru:

```bash
cd /var/www/veteran-cup
```

---

## 8. Konfigurace projektu

**Vytvoření souboru .env:**

```bash
nano .env
```

Vlož (uprav hesla a JWT_SECRET):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=veterancup
DB_PASSWORD=TvojeSilneHeslo123
DB_NAME=veterancup
JWT_SECRET=nahodny-retezec-min-32-znaku-pro-produkci
```

Ulož: `Ctrl+O`, Enter, `Ctrl+X`.

**Import schématu databáze** (spusť jako root, schema obsahuje CREATE DATABASE):

```bash
mysql -u root -p < sql/schema.sql
```

---

## 9. Build a spuštění aplikace

```bash
npm install --production
npm run build
pm2 start npm --name "veteran-cup" -- start
pm2 save
pm2 startup
```

(Poslední příkaz ti ukáže příkaz pro automatické spuštění po restartu – zkopíruj ho a spusť.)

---

## 10. Konfigurace nginx

```bash
nano /etc/nginx/sites-available/veterancup
```

Vlož (nahraď `tvoje-domena.cz` svou doménou):

```nginx
server {
    listen 80;
    server_name tvoje-domena.cz www.tvoje-domena.cz;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ulož a aktivuj:

```bash
ln -s /etc/nginx/sites-available/veterancup /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

---

## 11. SSL certifikát (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d tvoje-domena.cz -d www.tvoje-domena.cz
```

Postupuj podle dotazů. Certbot upraví nginx automaticky.

---

## 12. Firewall (volitelné, doporučeno)

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## 13. Nastavení DNS

U svého registrátora domény přidej A záznam:

- `tvoje-domena.cz` → IP adresa VPS
- `www.tvoje-domena.cz` → IP adresa VPS

---

## Užitečné příkazy

| Akce | Příkaz |
|------|--------|
| Zastavit aplikaci | `pm2 stop veteran-cup` |
| Spustit aplikaci | `pm2 start veteran-cup` |
| Restartovat | `pm2 restart veteran-cup` |
| Logy | `pm2 logs veteran-cup` |
| Stav | `pm2 status` |

---

## Aktualizace po změnách v kódu

```bash
cd /var/www/veteran-cup
git pull
npm install --production
npm run build
pm2 restart veteran-cup
```

---

## Optimalizace obrázků (produkce)

Pro optimalizaci log sponzorů z API přidej v `next.config.ts` svou doménu do `images.remotePatterns`:

```ts
{ protocol: "https", hostname: "tvoje-domena.cz", pathname: "/api/**" },
```

---

## Nasazení přes standalone archiv (`pack:standalone`)

Na **lokálním počítači** (v kořeni repozitáře):

```bash
npm run pack:standalone
```

Vznikne `veterancup-standalone.tar.gz` (build + `.next/static` + `public`, uvnitř archivu je `server.js` v kořeni). Soubor **neobsahuje** `.env` – na serveru musí být `.env` v `/var/www/veterancup/` už nastavený.

**Nahrání na server** (uprav IP a uživatele podle sebe):

```bash
scp veterancup-standalone.tar.gz administrator@10.0.9.43:~/
```

**Na serveru** (SSH jako `administrator`, pak podle potřeby `sudo su`). Pozor na cestu: domovský adresář je `/home/administrator/` (ne zkrácený překlep).

```bash
# 1) Rozbalení
mkdir -p /tmp/vc-deploy
tar xzf /home/administrator/veterancup-standalone.tar.gz -C /tmp/vc-deploy

# 2) Kontrola – musí tu být server.js
ls -la /tmp/vc-deploy/server.js

# 3) Sync do produkce (ecosystem na serveru nepřepisovat)
sudo rsync -a --delete \
  --exclude='ecosystem.config.cjs' \
  /tmp/vc-deploy/ /var/www/veterancup/

# 4) Vlastník – pod kým běží PM2 (např. gitdeploy)
sudo chown -R gitdeploy:gitdeploy /var/www/veterancup

# 5) Úklid
rm -rf /tmp/vc-deploy
```

**Sharp na Linuxu** (povinné po nasazení z Macu/Windows): v balíčku je skript `install-sharp-on-linux.sh` – bez něj uvidíš v logu `Could not load the "sharp" module using the linux-x64 runtime`.

```bash
sudo su - gitdeploy
cd /var/www/veterancup
./install-sharp-on-linux.sh
```

(Alternativa: `npm install --os=linux --cpu=x64 sharp`. Server musí mít výstup na internet kvůli npm. Po každém novém tarbalu z jiného OS znovu spusť skript, případně po změně verze `sharp` v `package.json`.)

**Restart aplikace** (jako uživatel, pod kterým běží PM2):

```bash
cd /var/www/veterancup
pm2 restart veterancup
pm2 logs veterancup --lines 30
```

PM2 musí spouštět `node server.js` (nebo ekvivalent) z `/var/www/veterancup`, kde po rsyncu leží rozbalený standalone.

---

## Kontrolní seznam před spuštěním

- [ ] MySQL běží a databáze existuje
- [ ] Soubor `.env` je vyplněný (včetně JWT_SECRET)
- [ ] `npm run build` proběhl bez chyby
- [ ] PM2 aplikaci spouští (`pm2 status`)
- [ ] nginx proxy funguje (port 3000)
- [ ] DNS ukazuje na IP VPS
- [ ] SSL certifikát je aktivní
