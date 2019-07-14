-- TODO: Add RETURNING to your Sql queries
-- CREATE
-- 1. signup
-- 2. signin
-- 3. create property
INSERT INTO users
  (first_name, last_name, phone_number, password, email, address, is_admin )
VALUES
  ( 'John', 'Paul', '09087653462', 'password', 'tammddfy@example.com', '20 Ibuku Street, Lagos', true);

INSERT INTO users
  (email, password)
VALUES
  (password, 'tammddfy@example.com');

INSERT INTO properties
  (price, state, city, address, type, image_url)
VALUES(2000.00, 'Lagos State', 'Yaba', '20 Ikorodu Road', '3 Bedroom', 'https://cloudinary.com/');
-- Update
INSERT INTO properties
  (price)
VALUES(5000, 00);

-- READ
-- 1. Get all property
-- 2. Get specific property
-- 3. Get all properties of specific type
SELECT price, state, city, address, type, image_url
from properties OFFSET
0 LIMIT 50;

SELECT price, state, city, address, type, image_url
from properties
WHERE id=1

SELECT price, state, city, address, type, image_url
from properties
WHERE type='mini-flat'
OFFSET 0 LIMIT 50;



-- UPDATE
-- 7. Update property                                          ===== Done. Thursday
-- 8. Mark property as sold
UPDATE properties SET =sold WHERE id=1;
UPDATE properties SET is_available=FALSE WHERE id=1;

-- DELETE
-- 9. Delete property
DELETE FROM properties WHERE id=2;
