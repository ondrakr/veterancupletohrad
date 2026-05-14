-- Heslo pro přihlášení: martin2025
-- Hash je bcrypt (10 rounds), stejný formát jako ověřuje /api/auth/login (bcryptjs.compare).
-- JWT_SECRET v .env.local slouží jen k podpisu session cookie (jwt.sign / jwt.verify), ne k heslu.
--
-- Upravte 'admin' na své uživatelské jméno z tabulky users_veteran, pokud není admin.

INSERT INTO users_veteran (username, password)
VALUES (
  'martin',
  '$2b$10$UFaxhPkg/98xbaVmruuzYOPWRW4TdvkGiZsTS.BUT3opdbuIIOklu'
)
ON DUPLICATE KEY UPDATE
  password = VALUES(password);
