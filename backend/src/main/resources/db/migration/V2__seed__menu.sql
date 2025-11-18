INSERT INTO menu_items (id, name, description, price, category) VALUES
(1, 'Cassava Leaves', 'Delicious Sierra Leonean cassava leaf stew cooked with palm oil, smoked fish, and meat.', 25.00, 'local'),
(2, 'Potato Leaves', 'A popular Sierra Leonean leafy stew prepared with palm oil, spices, meat, and fish.', 25.00, 'local'),
(3, 'Jollof Rice', 'Classic West African jollof rice cooked in tomato stew with spices and vegetables.', 20.00, 'rice'),
(4, 'Groundnut Soup', 'Rich groundnut (peanut) soup cooked with chicken or meat, served with rice.', 22.00, 'soup'),
(5, 'Fufu with Soup', 'Traditional Sierra Leonean fufu served with okra or palm oil soup.', 18.00, 'traditional'),
(6, 'Shawarma', 'Delicious chicken shawarma wrapped with vegetables, sauce, and spices.', 20.00, 'local')
ON CONFLICT (id) DO NOTHING;