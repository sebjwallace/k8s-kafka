CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL NOT NULL UNIQUE,
  customerId varchar NOT NULL,
  productId varchar NOT NULL,
  quantity int NOT NULL,
  timestamp timestamp default current_timestamp
);