/* =========================================================================
   CONTENT PACK: SQL Server
   ------------------------------------------------------------------------
   This file is 100% content. The app core does NOT know anything about SQL.
   To add a new subject later (Redis, Docker, NestJS...), create another file
   just like this one (same shape) and register it in content/index.js.

   Question shape:
     { id, topic, difficulty, question, answer, explanation }

   difficulty: "beginner" | "intermediate" | "advanced"
   ========================================================================= */

window.CONTENT_PACKS = window.CONTENT_PACKS || {};

window.CONTENT_PACKS.sqlserver = {
  id: "sqlserver",
  name: "SQL Server",
  icon: "🧠",

  // A short description of the sample database, shown in Settings > Course.
  schema: [
    "Users(UserId, Name, Email, Age, City, CreatedAt)",
    "Categories(CategoryId, Name)",
    "Products(ProductId, Name, Price, CategoryId, Stock)",
    "Orders(OrderId, UserId, OrderDate, Status, Total)",
    "OrderItems(OrderItemId, OrderId, ProductId, Quantity, UnitPrice)"
  ],

  questions: [
    /* ================= BEGINNER ================= */

    { id:"q001", topic:"SELECT", difficulty:"beginner",
      question:"Get all columns and all rows from the Users table.",
      answer:"SELECT * FROM Users;",
      explanation:"SELECT * returns every column. FROM says which table to read." },

    { id:"q002", topic:"SELECT", difficulty:"beginner",
      question:"Get only the Name and Email of every user.",
      answer:"SELECT Name, Email FROM Users;",
      explanation:"List the columns you want after SELECT, separated by commas." },

    { id:"q003", topic:"WHERE", difficulty:"beginner",
      question:"Get all users older than 30.",
      answer:"SELECT * FROM Users\nWHERE Age > 30;",
      explanation:"WHERE keeps only rows that match. > means greater than." },

    { id:"q004", topic:"WHERE", difficulty:"beginner",
      question:"Get all users whose age is exactly 25.",
      answer:"SELECT * FROM Users\nWHERE Age = 25;",
      explanation:"Use = to match an exact value." },

    { id:"q005", topic:"WHERE", difficulty:"beginner",
      question:"Get all users who live in 'Tel Aviv'.",
      answer:"SELECT * FROM Users\nWHERE City = 'Tel Aviv';",
      explanation:"Text values go inside single quotes." },

    { id:"q006", topic:"WHERE", difficulty:"beginner",
      question:"Get all users who are NOT from 'Tel Aviv'.",
      answer:"SELECT * FROM Users\nWHERE City <> 'Tel Aviv';",
      explanation:"<> means 'not equal'. You can also write != in SQL Server." },

    { id:"q007", topic:"ORDER BY", difficulty:"beginner",
      question:"Get all products sorted by price, from low to high.",
      answer:"SELECT * FROM Products\nORDER BY Price ASC;",
      explanation:"ORDER BY sorts the rows. ASC = small to big (it is also the default)." },

    { id:"q008", topic:"ORDER BY", difficulty:"beginner",
      question:"Get all products sorted by price, from high to low.",
      answer:"SELECT * FROM Products\nORDER BY Price DESC;",
      explanation:"DESC sorts from big to small." },

    { id:"q009", topic:"ORDER BY", difficulty:"beginner",
      question:"Get all users sorted by City, and inside each city by Age (youngest first).",
      answer:"SELECT * FROM Users\nORDER BY City ASC, Age ASC;",
      explanation:"You can sort by more than one column. The second one breaks ties in the first." },

    { id:"q010", topic:"TOP", difficulty:"beginner",
      question:"Get the 5 most expensive products.",
      answer:"SELECT TOP 5 *\nFROM Products\nORDER BY Price DESC;",
      explanation:"TOP limits how many rows come back. Sort first so 'top' means what you want." },

    { id:"q011", topic:"TOP", difficulty:"beginner",
      question:"Get the 3 newest users (by CreatedAt).",
      answer:"SELECT TOP 3 *\nFROM Users\nORDER BY CreatedAt DESC;",
      explanation:"Newest = latest date, so sort by date DESC and take the top 3." },

    { id:"q012", topic:"DISTINCT", difficulty:"beginner",
      question:"Get the list of cities where users live, with no duplicates.",
      answer:"SELECT DISTINCT City\nFROM Users;",
      explanation:"DISTINCT removes duplicate rows so each city appears once." },

    { id:"q013", topic:"WHERE", difficulty:"beginner",
      question:"Get all products that cost 100 or less.",
      answer:"SELECT * FROM Products\nWHERE Price <= 100;",
      explanation:"<= means 'less than or equal to'." },

    { id:"q014", topic:"BETWEEN", difficulty:"beginner",
      question:"Get all users whose age is between 20 and 30 (included).",
      answer:"SELECT * FROM Users\nWHERE Age BETWEEN 20 AND 30;",
      explanation:"BETWEEN a AND b includes both ends. Same as Age >= 20 AND Age <= 30." },

    { id:"q015", topic:"IN", difficulty:"beginner",
      question:"Get all users who live in 'Tel Aviv', 'Haifa', or 'Eilat'.",
      answer:"SELECT * FROM Users\nWHERE City IN ('Tel Aviv', 'Haifa', 'Eilat');",
      explanation:"IN checks if a value is in a list. Shorter than many OR conditions." },

    { id:"q016", topic:"LIKE", difficulty:"beginner",
      question:"Get all users whose name starts with 'A'.",
      answer:"SELECT * FROM Users\nWHERE Name LIKE 'A%';",
      explanation:"LIKE matches text patterns. % means 'any characters'. 'A%' = starts with A." },

    { id:"q017", topic:"LIKE", difficulty:"beginner",
      question:"Get all users whose email ends with '@gmail.com'.",
      answer:"SELECT * FROM Users\nWHERE Email LIKE '%@gmail.com';",
      explanation:"Put % at the start to mean 'anything before' the text you want." },

    { id:"q018", topic:"IS NULL", difficulty:"beginner",
      question:"Get all users who have no city set (City is empty/NULL).",
      answer:"SELECT * FROM Users\nWHERE City IS NULL;",
      explanation:"NULL means 'no value'. You must use IS NULL, not = NULL." },

    { id:"q019", topic:"IS NULL", difficulty:"beginner",
      question:"Get all users who DO have a city set.",
      answer:"SELECT * FROM Users\nWHERE City IS NOT NULL;",
      explanation:"IS NOT NULL keeps only rows that have a value." },

    { id:"q020", topic:"AND / OR", difficulty:"beginner",
      question:"Get all users from 'Haifa' who are older than 40.",
      answer:"SELECT * FROM Users\nWHERE City = 'Haifa' AND Age > 40;",
      explanation:"AND means both conditions must be true." },

    { id:"q021", topic:"AND / OR", difficulty:"beginner",
      question:"Get all users who are either under 18 or over 65.",
      answer:"SELECT * FROM Users\nWHERE Age < 18 OR Age > 65;",
      explanation:"OR means at least one condition is true." },

    { id:"q022", topic:"Alias", difficulty:"beginner",
      question:"Get the user name, but show the column with the title 'FullName'.",
      answer:"SELECT Name AS FullName\nFROM Users;",
      explanation:"AS gives a column a new name in the result. This is called an alias." },

    { id:"q023", topic:"COUNT", difficulty:"beginner",
      question:"Count how many users there are.",
      answer:"SELECT COUNT(*) AS TotalUsers\nFROM Users;",
      explanation:"COUNT(*) counts rows. The alias just names the result column." },

    { id:"q024", topic:"COUNT", difficulty:"beginner",
      question:"Count how many users are older than 30.",
      answer:"SELECT COUNT(*) AS OverThirty\nFROM Users\nWHERE Age > 30;",
      explanation:"WHERE filters first, then COUNT counts what is left." },

    { id:"q025", topic:"ORDER BY", difficulty:"beginner",
      question:"Get all products, showing the cheapest first.",
      answer:"SELECT * FROM Products\nORDER BY Price ASC;",
      explanation:"Cheapest first = sort by price ascending." },

    { id:"q026", topic:"WHERE", difficulty:"beginner",
      question:"Get all products that are out of stock (Stock = 0).",
      answer:"SELECT * FROM Products\nWHERE Stock = 0;",
      explanation:"Match the exact value 0 to find empty stock." },

    { id:"q027", topic:"WHERE", difficulty:"beginner",
      question:"Get all orders with status 'Paid'.",
      answer:"SELECT * FROM Orders\nWHERE Status = 'Paid';",
      explanation:"Filter text by matching it exactly inside quotes." },

    { id:"q028", topic:"SELECT", difficulty:"beginner",
      question:"Get the OrderId and Total of every order.",
      answer:"SELECT OrderId, Total\nFROM Orders;",
      explanation:"Pick just the two columns you need." },

    { id:"q029", topic:"TOP", difficulty:"beginner",
      question:"Get the single cheapest product.",
      answer:"SELECT TOP 1 *\nFROM Products\nORDER BY Price ASC;",
      explanation:"Sort cheapest first, then TOP 1 takes only that row." },

    { id:"q030", topic:"LIKE", difficulty:"beginner",
      question:"Get all products whose name contains the word 'Pro'.",
      answer:"SELECT * FROM Products\nWHERE Name LIKE '%Pro%';",
      explanation:"% on both sides means the text can appear anywhere in the name." },

    { id:"q031", topic:"NOT IN", difficulty:"beginner",
      question:"Get all orders whose status is not 'Cancelled' and not 'Refunded'.",
      answer:"SELECT * FROM Orders\nWHERE Status NOT IN ('Cancelled', 'Refunded');",
      explanation:"NOT IN removes rows that match any value in the list." },

    { id:"q032", topic:"ORDER BY + TOP", difficulty:"beginner",
      question:"Get the 10 users with the highest age.",
      answer:"SELECT TOP 10 *\nFROM Users\nORDER BY Age DESC;",
      explanation:"Sort by age from high to low, then take the first 10." },

    { id:"q033", topic:"WHERE", difficulty:"beginner",
      question:"Get all products that cost more than 50 and less than 200.",
      answer:"SELECT * FROM Products\nWHERE Price > 50 AND Price < 200;",
      explanation:"Combine two conditions with AND to make a range (ends not included here)." },

    { id:"q034", topic:"DISTINCT", difficulty:"beginner",
      question:"Get the list of different order statuses that exist.",
      answer:"SELECT DISTINCT Status\nFROM Orders;",
      explanation:"DISTINCT shows each status value only once." },

    { id:"q035", topic:"Alias", difficulty:"beginner",
      question:"Show product price with the column named 'Cost'.",
      answer:"SELECT Name, Price AS Cost\nFROM Products;",
      explanation:"Rename any column in the output using AS." },

    { id:"q036", topic:"WHERE", difficulty:"beginner",
      question:"Get all users created in the year 2024 or later.",
      answer:"SELECT * FROM Users\nWHERE CreatedAt >= '2024-01-01';",
      explanation:"Dates compare like numbers. >= a date means 'on or after' it." },

    { id:"q037", topic:"COUNT", difficulty:"beginner",
      question:"Count how many products are in stock (Stock greater than 0).",
      answer:"SELECT COUNT(*) AS InStock\nFROM Products\nWHERE Stock > 0;",
      explanation:"Filter with WHERE, then COUNT the remaining rows." },

    { id:"q038", topic:"ORDER BY", difficulty:"beginner",
      question:"Get all users sorted by name from A to Z.",
      answer:"SELECT * FROM Users\nORDER BY Name ASC;",
      explanation:"Text also sorts. ASC on text means A to Z." },

    { id:"q039", topic:"TOP PERCENT", difficulty:"beginner",
      question:"Get the top 10 percent most expensive products.",
      answer:"SELECT TOP 10 PERCENT *\nFROM Products\nORDER BY Price DESC;",
      explanation:"TOP ... PERCENT takes a share of the rows instead of a fixed number." },

    { id:"q040", topic:"WHERE", difficulty:"beginner",
      question:"Get all orders with a total of at least 1000.",
      answer:"SELECT * FROM Orders\nWHERE Total >= 1000;",
      explanation:"'At least' means greater than or equal, so use >=." },

    /* ================= INTERMEDIATE ================= */

    { id:"q041", topic:"GROUP BY", difficulty:"intermediate",
      question:"Count how many users live in each city.",
      answer:"SELECT City, COUNT(*) AS UserCount\nFROM Users\nGROUP BY City;",
      explanation:"GROUP BY makes one row per city. COUNT(*) counts users inside each group." },

    { id:"q042", topic:"GROUP BY", difficulty:"intermediate",
      question:"Find the average product price for each category.",
      answer:"SELECT CategoryId, AVG(Price) AS AvgPrice\nFROM Products\nGROUP BY CategoryId;",
      explanation:"AVG gives the average. GROUP BY runs it once per category." },

    { id:"q043", topic:"Aggregate", difficulty:"intermediate",
      question:"Find the highest and lowest product price in the whole table.",
      answer:"SELECT MAX(Price) AS MaxPrice,\n       MIN(Price) AS MinPrice\nFROM Products;",
      explanation:"MAX and MIN work on all rows when there is no GROUP BY." },

    { id:"q044", topic:"Aggregate", difficulty:"intermediate",
      question:"Find the total money value of all orders (sum of Total).",
      answer:"SELECT SUM(Total) AS Revenue\nFROM Orders;",
      explanation:"SUM adds up all values in a column." },

    { id:"q045", topic:"GROUP BY", difficulty:"intermediate",
      question:"Count how many orders each user made.",
      answer:"SELECT UserId, COUNT(*) AS OrderCount\nFROM Orders\nGROUP BY UserId;",
      explanation:"Group the orders by user, then count each group." },

    { id:"q046", topic:"GROUP BY", difficulty:"intermediate",
      question:"Find the total spent by each user (sum of order totals).",
      answer:"SELECT UserId, SUM(Total) AS Spent\nFROM Orders\nGROUP BY UserId;",
      explanation:"SUM inside a GROUP BY adds up per user." },

    { id:"q047", topic:"HAVING", difficulty:"intermediate",
      question:"Find cities that have more than 10 users.",
      answer:"SELECT City, COUNT(*) AS UserCount\nFROM Users\nGROUP BY City\nHAVING COUNT(*) > 10;",
      explanation:"HAVING filters groups after GROUP BY. WHERE filters rows before grouping." },

    { id:"q048", topic:"HAVING", difficulty:"intermediate",
      question:"Find users who spent more than 5000 in total across their orders.",
      answer:"SELECT UserId, SUM(Total) AS Spent\nFROM Orders\nGROUP BY UserId\nHAVING SUM(Total) > 5000;",
      explanation:"Use HAVING to filter on an aggregate like SUM." },

    { id:"q049", topic:"JOIN", difficulty:"intermediate",
      question:"List each order with the name of the user who made it.",
      answer:"SELECT o.OrderId, u.Name, o.Total\nFROM Orders o\nJOIN Users u ON o.UserId = u.UserId;",
      explanation:"JOIN connects two tables. ON says which columns match. Aliases (o, u) keep it short." },

    { id:"q050", topic:"JOIN", difficulty:"intermediate",
      question:"List each product with its category name.",
      answer:"SELECT p.Name AS Product, c.Name AS Category\nFROM Products p\nJOIN Categories c ON p.CategoryId = c.CategoryId;",
      explanation:"Match Products.CategoryId to Categories.CategoryId to bring the name over." },

    { id:"q051", topic:"JOIN", difficulty:"intermediate",
      question:"List every order item with its product name and quantity.",
      answer:"SELECT oi.OrderId, p.Name, oi.Quantity\nFROM OrderItems oi\nJOIN Products p ON oi.ProductId = p.ProductId;",
      explanation:"Join OrderItems to Products on ProductId to get readable product names." },

    { id:"q052", topic:"LEFT JOIN", difficulty:"intermediate",
      question:"List all users and their orders, including users who have no orders.",
      answer:"SELECT u.Name, o.OrderId\nFROM Users u\nLEFT JOIN Orders o ON u.UserId = o.UserId;",
      explanation:"LEFT JOIN keeps every row from the left table. Missing matches show as NULL." },

    { id:"q053", topic:"LEFT JOIN", difficulty:"intermediate",
      question:"Find users who never placed an order.",
      answer:"SELECT u.Name\nFROM Users u\nLEFT JOIN Orders o ON u.UserId = o.UserId\nWHERE o.OrderId IS NULL;",
      explanation:"After a LEFT JOIN, rows with no match have NULL. IS NULL finds users with no order." },

    { id:"q054", topic:"CASE", difficulty:"intermediate",
      question:"Show each user's name and label them 'Adult' if Age >= 18, else 'Minor'.",
      answer:"SELECT Name,\n  CASE WHEN Age >= 18 THEN 'Adult'\n       ELSE 'Minor'\n  END AS AgeGroup\nFROM Users;",
      explanation:"CASE is like if/else inside a query. It returns a value per row." },

    { id:"q055", topic:"CASE", difficulty:"intermediate",
      question:"Label products as 'Cheap' (<50), 'Normal' (50-200), or 'Expensive' (>200).",
      answer:"SELECT Name,\n  CASE\n    WHEN Price < 50 THEN 'Cheap'\n    WHEN Price <= 200 THEN 'Normal'\n    ELSE 'Expensive'\n  END AS PriceBand\nFROM Products;",
      explanation:"CASE checks each WHEN in order and stops at the first true one." },

    { id:"q056", topic:"Subquery", difficulty:"intermediate",
      question:"Find products that cost more than the average product price.",
      answer:"SELECT * FROM Products\nWHERE Price > (SELECT AVG(Price) FROM Products);",
      explanation:"The inner query gives one number (the average). The outer query compares to it." },

    { id:"q057", topic:"Subquery", difficulty:"intermediate",
      question:"Find users who have at least one order.",
      answer:"SELECT * FROM Users\nWHERE UserId IN (SELECT UserId FROM Orders);",
      explanation:"The subquery returns a list of user ids. IN checks membership in that list." },

    { id:"q058", topic:"Subquery", difficulty:"intermediate",
      question:"Find users who never ordered, using a subquery.",
      answer:"SELECT * FROM Users\nWHERE UserId NOT IN (SELECT UserId FROM Orders);",
      explanation:"NOT IN keeps users whose id is not in the list of ordering users." },

    { id:"q059", topic:"GROUP BY + JOIN", difficulty:"intermediate",
      question:"Count how many products are in each category, showing the category name.",
      answer:"SELECT c.Name, COUNT(*) AS ProductCount\nFROM Products p\nJOIN Categories c ON p.CategoryId = c.CategoryId\nGROUP BY c.Name;",
      explanation:"Join first to get the name, then group by that name and count." },

    { id:"q060", topic:"GROUP BY + JOIN", difficulty:"intermediate",
      question:"Show each user's name and how many orders they made.",
      answer:"SELECT u.Name, COUNT(o.OrderId) AS Orders\nFROM Users u\nLEFT JOIN Orders o ON u.UserId = o.UserId\nGROUP BY u.Name;",
      explanation:"LEFT JOIN keeps everyone; COUNT of a column ignores NULLs, so no-order users get 0." },

    { id:"q061", topic:"Aggregate", difficulty:"intermediate",
      question:"Find the average age of users in each city.",
      answer:"SELECT City, AVG(Age) AS AvgAge\nFROM Users\nGROUP BY City;",
      explanation:"AVG per group gives one average per city." },

    { id:"q062", topic:"HAVING", difficulty:"intermediate",
      question:"Find categories whose average product price is above 100.",
      answer:"SELECT CategoryId, AVG(Price) AS AvgPrice\nFROM Products\nGROUP BY CategoryId\nHAVING AVG(Price) > 100;",
      explanation:"HAVING filters the grouped result using the aggregate value." },

    { id:"q063", topic:"JOIN", difficulty:"intermediate",
      question:"List order items with the order date and product name.",
      answer:"SELECT o.OrderDate, p.Name, oi.Quantity\nFROM OrderItems oi\nJOIN Orders o ON oi.OrderId = o.OrderId\nJOIN Products p ON oi.ProductId = p.ProductId;",
      explanation:"You can join more than two tables by chaining JOIN ... ON." },

    { id:"q064", topic:"GROUP BY", difficulty:"intermediate",
      question:"Find the total quantity sold for each product.",
      answer:"SELECT ProductId, SUM(Quantity) AS TotalSold\nFROM OrderItems\nGROUP BY ProductId;",
      explanation:"Group the order items by product and sum the quantities." },

    { id:"q065", topic:"DISTINCT COUNT", difficulty:"intermediate",
      question:"Count how many different cities users come from.",
      answer:"SELECT COUNT(DISTINCT City) AS Cities\nFROM Users;",
      explanation:"COUNT(DISTINCT col) counts unique values only." },

    { id:"q066", topic:"CASE + Aggregate", difficulty:"intermediate",
      question:"Count how many orders are 'Paid' and how many are 'Pending' in one row.",
      answer:"SELECT\n  SUM(CASE WHEN Status = 'Paid' THEN 1 ELSE 0 END) AS Paid,\n  SUM(CASE WHEN Status = 'Pending' THEN 1 ELSE 0 END) AS Pending\nFROM Orders;",
      explanation:"CASE turns a condition into 1 or 0, and SUM counts the 1s. This is conditional counting." },

    { id:"q067", topic:"JOIN + WHERE", difficulty:"intermediate",
      question:"List product names in the category called 'Electronics'.",
      answer:"SELECT p.Name\nFROM Products p\nJOIN Categories c ON p.CategoryId = c.CategoryId\nWHERE c.Name = 'Electronics';",
      explanation:"Join to reach the category name, then filter on it with WHERE." },

    { id:"q068", topic:"Subquery", difficulty:"intermediate",
      question:"Find the product(s) with the highest price.",
      answer:"SELECT * FROM Products\nWHERE Price = (SELECT MAX(Price) FROM Products);",
      explanation:"The subquery finds the max price; the outer query returns rows that match it." },

    { id:"q069", topic:"GROUP BY + ORDER BY", difficulty:"intermediate",
      question:"Show cities and their user counts, most users first.",
      answer:"SELECT City, COUNT(*) AS Users\nFROM Users\nGROUP BY City\nORDER BY Users DESC;",
      explanation:"You can ORDER BY an alias from the SELECT list to sort the groups." },

    { id:"q070", topic:"INSERT", difficulty:"intermediate",
      question:"Add a new user named 'Dana' with email 'dana@mail.com', age 28, city 'Haifa'.",
      answer:"INSERT INTO Users (Name, Email, Age, City)\nVALUES ('Dana', 'dana@mail.com', 28, 'Haifa');",
      explanation:"INSERT adds a row. List the columns, then the matching VALUES." },

    { id:"q071", topic:"UPDATE", difficulty:"intermediate",
      question:"Change the city of the user with UserId 5 to 'Eilat'.",
      answer:"UPDATE Users\nSET City = 'Eilat'\nWHERE UserId = 5;",
      explanation:"UPDATE changes existing rows. Always add WHERE, or every row changes." },

    { id:"q072", topic:"DELETE", difficulty:"intermediate",
      question:"Delete all orders with status 'Cancelled'.",
      answer:"DELETE FROM Orders\nWHERE Status = 'Cancelled';",
      explanation:"DELETE removes rows that match WHERE. Without WHERE it removes everything." },

    { id:"q073", topic:"JOIN + GROUP BY", difficulty:"intermediate",
      question:"Find total revenue per user, showing the user's name.",
      answer:"SELECT u.Name, SUM(o.Total) AS Revenue\nFROM Users u\nJOIN Orders o ON u.UserId = o.UserId\nGROUP BY u.Name;",
      explanation:"Join to get names, then group by name and sum the totals." },

    { id:"q074", topic:"LEFT JOIN + Aggregate", difficulty:"intermediate",
      question:"Show every product and how many times it was ordered (0 if never).",
      answer:"SELECT p.Name, COUNT(oi.OrderItemId) AS TimesOrdered\nFROM Products p\nLEFT JOIN OrderItems oi ON p.ProductId = oi.ProductId\nGROUP BY p.Name;",
      explanation:"LEFT JOIN keeps all products; COUNT of the item id gives 0 for products never ordered." },

    { id:"q075", topic:"IN + Subquery", difficulty:"intermediate",
      question:"Find products that were ordered at least once.",
      answer:"SELECT * FROM Products\nWHERE ProductId IN (SELECT ProductId FROM OrderItems);",
      explanation:"The subquery lists ordered product ids; IN keeps products found in that list." },

    { id:"q076", topic:"ORDER BY expression", difficulty:"intermediate",
      question:"Show order items with a LineTotal (Quantity * UnitPrice), biggest first.",
      answer:"SELECT OrderId, Quantity * UnitPrice AS LineTotal\nFROM OrderItems\nORDER BY LineTotal DESC;",
      explanation:"You can do math in SELECT, name it, and sort by it." },

    { id:"q077", topic:"GROUP BY", difficulty:"intermediate",
      question:"For each order, find its total item value (sum of Quantity * UnitPrice).",
      answer:"SELECT OrderId, SUM(Quantity * UnitPrice) AS ItemsTotal\nFROM OrderItems\nGROUP BY OrderId;",
      explanation:"You can put an expression inside SUM, then group by the order." },

    { id:"q078", topic:"HAVING + JOIN", difficulty:"intermediate",
      question:"Find users who made more than 3 orders, showing their name.",
      answer:"SELECT u.Name, COUNT(*) AS Orders\nFROM Users u\nJOIN Orders o ON u.UserId = o.UserId\nGROUP BY u.Name\nHAVING COUNT(*) > 3;",
      explanation:"Group per user, then HAVING keeps only users with more than 3 orders." },

    { id:"q079", topic:"CASE in ORDER BY", difficulty:"intermediate",
      question:"Sort orders so 'Pending' comes first, then everything else.",
      answer:"SELECT * FROM Orders\nORDER BY CASE WHEN Status = 'Pending' THEN 0 ELSE 1 END, OrderDate;",
      explanation:"A CASE in ORDER BY builds a custom sort priority." },

    { id:"q080", topic:"Subquery in SELECT", difficulty:"intermediate",
      question:"Show each user's name next to the total number of users.",
      answer:"SELECT Name,\n  (SELECT COUNT(*) FROM Users) AS TotalUsers\nFROM Users;",
      explanation:"A subquery in the SELECT list runs and returns one value for every row." },

    /* ================= ADVANCED ================= */

    { id:"q081", topic:"CTE", difficulty:"advanced",
      question:"Using a CTE, find users who spent more than 5000 in total.",
      answer:"WITH UserSpend AS (\n  SELECT UserId, SUM(Total) AS Spent\n  FROM Orders\n  GROUP BY UserId\n)\nSELECT * FROM UserSpend\nWHERE Spent > 5000;",
      explanation:"A CTE (WITH ...) is a named temporary result you can query below. It makes steps readable." },

    { id:"q082", topic:"CTE", difficulty:"advanced",
      question:"Using a CTE, list categories with their average price, then keep only those above 100.",
      answer:"WITH CatAvg AS (\n  SELECT CategoryId, AVG(Price) AS AvgPrice\n  FROM Products\n  GROUP BY CategoryId\n)\nSELECT * FROM CatAvg\nWHERE AvgPrice > 100;",
      explanation:"Build the grouped result once in the CTE, then filter it simply in the main query." },

    { id:"q083", topic:"ROW_NUMBER", difficulty:"advanced",
      question:"Give every product a row number ordered by price (highest = 1).",
      answer:"SELECT Name, Price,\n  ROW_NUMBER() OVER (ORDER BY Price DESC) AS RowNum\nFROM Products;",
      explanation:"ROW_NUMBER is a window function. OVER(ORDER BY ...) decides the numbering order." },

    { id:"q084", topic:"RANK", difficulty:"advanced",
      question:"Rank products by price. Equal prices should share the same rank.",
      answer:"SELECT Name, Price,\n  RANK() OVER (ORDER BY Price DESC) AS PriceRank\nFROM Products;",
      explanation:"RANK gives ties the same number and then skips the next ones (1,1,3...)." },

    { id:"q085", topic:"DENSE_RANK", difficulty:"advanced",
      question:"Rank products by price with no gaps after ties.",
      answer:"SELECT Name, Price,\n  DENSE_RANK() OVER (ORDER BY Price DESC) AS PriceRank\nFROM Products;",
      explanation:"DENSE_RANK is like RANK but does not skip numbers after a tie (1,1,2...)." },

    { id:"q086", topic:"PARTITION BY", difficulty:"advanced",
      question:"Number products inside each category, cheapest first.",
      answer:"SELECT Name, CategoryId, Price,\n  ROW_NUMBER() OVER (PARTITION BY CategoryId ORDER BY Price ASC) AS RN\nFROM Products;",
      explanation:"PARTITION BY restarts the window per group, so numbering starts again in each category." },

    { id:"q087", topic:"Top per group", difficulty:"advanced",
      question:"Find the most expensive product in each category.",
      answer:"WITH Ranked AS (\n  SELECT *,\n    ROW_NUMBER() OVER (PARTITION BY CategoryId ORDER BY Price DESC) AS RN\n  FROM Products\n)\nSELECT * FROM Ranked\nWHERE RN = 1;",
      explanation:"Number rows per category by price, then keep only RN = 1 (the top of each group)." },

    { id:"q088", topic:"Window SUM", difficulty:"advanced",
      question:"Show each order's total next to the running total over time (by OrderDate).",
      answer:"SELECT OrderId, OrderDate, Total,\n  SUM(Total) OVER (ORDER BY OrderDate) AS RunningTotal\nFROM Orders;",
      explanation:"SUM as a window function with ORDER BY gives a running (cumulative) total." },

    { id:"q089", topic:"Window AVG", difficulty:"advanced",
      question:"Show each product's price next to the average price of its category.",
      answer:"SELECT Name, CategoryId, Price,\n  AVG(Price) OVER (PARTITION BY CategoryId) AS CatAvg\nFROM Products;",
      explanation:"A window AVG with PARTITION BY keeps every row but adds the group's average beside it." },

    { id:"q090", topic:"LAG", difficulty:"advanced",
      question:"For each order (by date), show the previous order's total.",
      answer:"SELECT OrderId, OrderDate, Total,\n  LAG(Total) OVER (ORDER BY OrderDate) AS PrevTotal\nFROM Orders;",
      explanation:"LAG looks at the previous row in the window order. The first row gets NULL." },

    { id:"q091", topic:"LEAD", difficulty:"advanced",
      question:"For each order (by date), show the next order's total.",
      answer:"SELECT OrderId, OrderDate, Total,\n  LEAD(Total) OVER (ORDER BY OrderDate) AS NextTotal\nFROM Orders;",
      explanation:"LEAD looks at the next row. The last row gets NULL." },

    { id:"q092", topic:"CTE + JOIN", difficulty:"advanced",
      question:"Using a CTE of revenue per user, show the user's name and revenue for those over 1000.",
      answer:"WITH Rev AS (\n  SELECT UserId, SUM(Total) AS Revenue\n  FROM Orders\n  GROUP BY UserId\n)\nSELECT u.Name, r.Revenue\nFROM Rev r\nJOIN Users u ON r.UserId = u.UserId\nWHERE r.Revenue > 1000;",
      explanation:"Compute the aggregate in a CTE, then join it to Users for readable output." },

    { id:"q093", topic:"NTILE", difficulty:"advanced",
      question:"Split products into 4 equal price groups (quartiles).",
      answer:"SELECT Name, Price,\n  NTILE(4) OVER (ORDER BY Price) AS Quartile\nFROM Products;",
      explanation:"NTILE(4) divides the ordered rows into 4 buckets of roughly equal size." },

    { id:"q094", topic:"EXISTS", difficulty:"advanced",
      question:"Find users who have at least one 'Paid' order, using EXISTS.",
      answer:"SELECT * FROM Users u\nWHERE EXISTS (\n  SELECT 1 FROM Orders o\n  WHERE o.UserId = u.UserId AND o.Status = 'Paid'\n);",
      explanation:"EXISTS is true if the inner query finds any row. It stops as soon as one match is found." },

    { id:"q095", topic:"Correlated subquery", difficulty:"advanced",
      question:"Show each user with the count of their own orders, using a correlated subquery.",
      answer:"SELECT Name,\n  (SELECT COUNT(*) FROM Orders o WHERE o.UserId = u.UserId) AS Orders\nFROM Users u;",
      explanation:"A correlated subquery runs per outer row and references it (u.UserId) inside." },

    { id:"q096", topic:"Self JOIN", difficulty:"advanced",
      question:"Find pairs of users who live in the same city (no user paired with itself).",
      answer:"SELECT a.Name AS User1, b.Name AS User2, a.City\nFROM Users a\nJOIN Users b ON a.City = b.City AND a.UserId < b.UserId;",
      explanation:"A self join joins a table to itself. UserId < UserId avoids duplicates and self-pairs." },

    { id:"q097", topic:"CTE + Window", difficulty:"advanced",
      question:"Rank users by total spend and show only the top 3 spenders.",
      answer:"WITH Spend AS (\n  SELECT UserId, SUM(Total) AS Total,\n    RANK() OVER (ORDER BY SUM(Total) DESC) AS rnk\n  FROM Orders\n  GROUP BY UserId\n)\nSELECT * FROM Spend\nWHERE rnk <= 3;",
      explanation:"You can use a window function on top of a GROUP BY, then filter the rank in the outer query." },

    { id:"q098", topic:"COALESCE", difficulty:"advanced",
      question:"Show each user's city, but display 'Unknown' when the city is NULL.",
      answer:"SELECT Name, COALESCE(City, 'Unknown') AS City\nFROM Users;",
      explanation:"COALESCE returns the first non-NULL value, so it replaces NULL with a default." },

    { id:"q099", topic:"Window running count", difficulty:"advanced",
      question:"For each user's orders (by date), number them 1, 2, 3... per user.",
      answer:"SELECT UserId, OrderId, OrderDate,\n  ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY OrderDate) AS OrderSeq\nFROM Orders;",
      explanation:"PARTITION BY UserId restarts the count for each user, ordered by date." },

    { id:"q100", topic:"HAVING + Window mix", difficulty:"advanced",
      question:"Find categories where the average price is higher than the overall average price.",
      answer:"SELECT CategoryId, AVG(Price) AS CatAvg\nFROM Products\nGROUP BY CategoryId\nHAVING AVG(Price) > (SELECT AVG(Price) FROM Products);",
      explanation:"HAVING can compare a group's aggregate to a scalar subquery of the whole table." },

    { id:"q101", topic:"CTE chain", difficulty:"advanced",
      question:"Using two CTEs, find each category's product count and keep only those with more than 5 products.",
      answer:"WITH Counts AS (\n  SELECT CategoryId, COUNT(*) AS Cnt\n  FROM Products\n  GROUP BY CategoryId\n),\nBig AS (\n  SELECT * FROM Counts WHERE Cnt > 5\n)\nSELECT c.Name, b.Cnt\nFROM Big b\nJOIN Categories c ON b.CategoryId = c.CategoryId;",
      explanation:"You can define several CTEs separated by commas and build one on top of another." },

    { id:"q102", topic:"PERCENT window", difficulty:"advanced",
      question:"Show each product's price as a percent of its category total.",
      answer:"SELECT Name, CategoryId, Price,\n  100.0 * Price / SUM(Price) OVER (PARTITION BY CategoryId) AS PctOfCat\nFROM Products;",
      explanation:"Divide the row value by a window SUM to get its share of the group. 100.0 forces decimals." },

    { id:"q103", topic:"FIRST_VALUE", difficulty:"advanced",
      question:"For each product, show the name of the cheapest product in its category.",
      answer:"SELECT Name, CategoryId,\n  FIRST_VALUE(Name) OVER (PARTITION BY CategoryId ORDER BY Price ASC) AS CheapestInCat\nFROM Products;",
      explanation:"FIRST_VALUE returns the first row's value in the window frame, per partition." },

    { id:"q104", topic:"Delete with subquery", difficulty:"advanced",
      question:"Delete order items that belong to cancelled orders.",
      answer:"DELETE FROM OrderItems\nWHERE OrderId IN (\n  SELECT OrderId FROM Orders WHERE Status = 'Cancelled'\n);",
      explanation:"The subquery lists cancelled order ids; DELETE removes items matching those ids." },

    { id:"q105", topic:"Update with JOIN", difficulty:"advanced",
      question:"Set each order's Total to the sum of its order items (Quantity * UnitPrice).",
      answer:"UPDATE o\nSET o.Total = t.Sum\nFROM Orders o\nJOIN (\n  SELECT OrderId, SUM(Quantity * UnitPrice) AS Sum\n  FROM OrderItems\n  GROUP BY OrderId\n) t ON o.OrderId = t.OrderId;",
      explanation:"SQL Server lets you UPDATE ... FROM with a JOIN to a computed table." },

    { id:"q106", topic:"CROSS APPLY", difficulty:"advanced",
      question:"For each user, show their 2 most recent orders using CROSS APPLY.",
      answer:"SELECT u.Name, o.OrderId, o.OrderDate\nFROM Users u\nCROSS APPLY (\n  SELECT TOP 2 OrderId, OrderDate\n  FROM Orders\n  WHERE UserId = u.UserId\n  ORDER BY OrderDate DESC\n) o;",
      explanation:"CROSS APPLY runs the inner query per user, great for 'top N per group'." },

    { id:"q107", topic:"GROUPING SETS", difficulty:"advanced",
      question:"Get user counts per city AND the grand total in one result.",
      answer:"SELECT City, COUNT(*) AS Users\nFROM Users\nGROUP BY GROUPING SETS ((City), ());",
      explanation:"GROUPING SETS lets one query return several grouping levels at once; () is the grand total." },

    { id:"q108", topic:"Window frame", difficulty:"advanced",
      question:"Show a 3-order moving average of Total, ordered by date.",
      answer:"SELECT OrderId, OrderDate, Total,\n  AVG(Total) OVER (ORDER BY OrderDate\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovingAvg\nFROM Orders;",
      explanation:"A frame (ROWS BETWEEN ...) limits the window to nearby rows, here the current and 2 before." },

    { id:"q109", topic:"PIVOT", difficulty:"advanced",
      question:"Count orders per status as columns (Paid, Pending, Cancelled) using PIVOT.",
      answer:"SELECT *\nFROM (SELECT OrderId, Status FROM Orders) src\nPIVOT (\n  COUNT(OrderId) FOR Status IN ([Paid], [Pending], [Cancelled])\n) AS p;",
      explanation:"PIVOT turns row values (statuses) into columns. It is SQL Server's way to make cross-tabs." },

    { id:"q110", topic:"Recursive CTE", difficulty:"advanced",
      question:"Use a recursive CTE to list the numbers 1 to 10.",
      answer:"WITH Nums AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM Nums WHERE n < 10\n)\nSELECT n FROM Nums;",
      explanation:"A recursive CTE calls itself with UNION ALL until the WHERE stops it. Useful for sequences and trees." }
  ]
};
