CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT,
  description TEXT,
  price REAL NOT NULL,
  area REAL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  floor INTEGER,
  location TEXT,
  images TEXT DEFAULT '[]',
  status TEXT DEFAULT 'available',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchase_requests (
  id TEXT PRIMARY KEY,
  property_id TEXT NOT NULL REFERENCES properties(id),
  buyer_id TEXT NOT NULL REFERENCES users(id),
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  property_id TEXT NOT NULL REFERENCES properties(id),
  seller_id TEXT NOT NULL REFERENCES users(id),
  buyer_id TEXT NOT NULL REFERENCES users(id),
  final_price REAL NOT NULL,
  commission_percent REAL NOT NULL,
  commission_amount REAL NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  user_id TEXT NOT NULL,
  property_id TEXT NOT NULL,
  PRIMARY KEY (user_id, property_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  property_id TEXT NOT NULL REFERENCES properties(id),
  reporter_id TEXT NOT NULL REFERENCES users(id),
  reason TEXT,
  status TEXT DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL REFERENCES users(id),
  receiver_id TEXT NOT NULL REFERENCES users(id),
  property_id TEXT REFERENCES properties(id),
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  commission_percent REAL DEFAULT 2.0,
  site_name TEXT DEFAULT 'سوق العقارات'
);