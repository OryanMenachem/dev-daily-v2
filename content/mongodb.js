/* =========================================================================
   CONTENT PACK: MongoDB (Compass)
   ------------------------------------------------------------------------
   Answers are written the way you paste them into MongoDB Compass:
   - Simple queries  -> the FILTER document you type in the Compass filter bar
                        e.g.  { age: { $gt: 30 } }
   - Aggregations    -> the full PIPELINE array you paste in the Aggregations tab
                        e.g.  [ { $match: {...} }, { $group: {...} } ]

   Same sample world as the SQL course, as Mongo collections:
     users, orders, products, categories
   ========================================================================= */

window.CONTENT_PACKS = window.CONTENT_PACKS || {};

window.CONTENT_PACKS.mongodb = {
  id: "mongodb",
  name: "MongoDB",
  icon: "🍃",

  schema: [
    "users     { _id, name, email, age, city, createdAt }",
    "products  { _id, name, price, categoryId, stock, tags: [] }",
    "orders    { _id, userId, orderDate, status, total, items: [ { productId, qty, unitPrice } ] }",
    "categories{ _id, name }",
    "",
    "Tip: in Compass, the filter bar takes the { ... } document.",
    "Aggregations tab takes the [ ... ] pipeline array."
  ],

  questions: [
    /* ================= BEGINNER — filter bar ================= */

    { id:"m001", topic:"find all", difficulty:"beginner",
      question:"Show all users (no filter).",
      answer:"{}",
      explanation:"An empty filter {} matches every document. In Compass, leaving the bar empty does the same." },

    { id:"m002", topic:"equality", difficulty:"beginner",
      question:"Find users who live in 'Tel Aviv'.",
      answer:"{ city: \"Tel Aviv\" }",
      explanation:"A plain field: value pair means 'equals'. Strings go in double quotes." },

    { id:"m003", topic:"equality", difficulty:"beginner",
      question:"Find users whose age is exactly 25.",
      answer:"{ age: 25 }",
      explanation:"Numbers need no quotes. field: value = exact match." },

    { id:"m004", topic:"$gt", difficulty:"beginner",
      question:"Find users older than 30.",
      answer:"{ age: { $gt: 30 } }",
      explanation:"$gt = greater than. Comparison operators wrap the value in { }." },

    { id:"m005", topic:"$gte", difficulty:"beginner",
      question:"Find products that cost 100 or more.",
      answer:"{ price: { $gte: 100 } }",
      explanation:"$gte = greater than or equal. Also: $lt, $lte for less-than." },

    { id:"m006", topic:"$lt", difficulty:"beginner",
      question:"Find products cheaper than 50.",
      answer:"{ price: { $lt: 50 } }",
      explanation:"$lt = less than." },

    { id:"m007", topic:"$ne", difficulty:"beginner",
      question:"Find users who are NOT from 'Tel Aviv'.",
      answer:"{ city: { $ne: \"Tel Aviv\" } }",
      explanation:"$ne = not equal." },

    { id:"m008", topic:"range", difficulty:"beginner",
      question:"Find users whose age is between 20 and 30 (included).",
      answer:"{ age: { $gte: 20, $lte: 30 } }",
      explanation:"Two operators on one field act together, giving a range." },

    { id:"m009", topic:"$in", difficulty:"beginner",
      question:"Find users who live in 'Tel Aviv', 'Haifa', or 'Eilat'.",
      answer:"{ city: { $in: [\"Tel Aviv\", \"Haifa\", \"Eilat\"] } }",
      explanation:"$in matches any value in the array. Like SQL's IN (...)." },

    { id:"m010", topic:"$nin", difficulty:"beginner",
      question:"Find orders whose status is not 'Cancelled' and not 'Refunded'.",
      answer:"{ status: { $nin: [\"Cancelled\", \"Refunded\"] } }",
      explanation:"$nin = not in the list." },

    { id:"m011", topic:"AND", difficulty:"beginner",
      question:"Find users from 'Haifa' who are older than 40.",
      answer:"{ city: \"Haifa\", age: { $gt: 40 } }",
      explanation:"Several fields in one document are AND-ed together automatically." },

    { id:"m012", topic:"$or", difficulty:"beginner",
      question:"Find users who are under 18 OR over 65.",
      answer:"{ $or: [ { age: { $lt: 18 } }, { age: { $gt: 65 } } ] }",
      explanation:"$or takes an array of conditions; a document matches if any one is true." },

    { id:"m013", topic:"ObjectId", difficulty:"beginner",
      question:"Find the single user with _id 6512c2a1e4b0f2a9d1c3b4e5.",
      answer:"{ _id: ObjectId(\"6512c2a1e4b0f2a9d1c3b4e5\") }",
      explanation:"_id is usually an ObjectId, not a string. Wrap the hex in ObjectId(\"...\")." },

    { id:"m014", topic:"$exists", difficulty:"beginner",
      question:"Find users that have no 'city' field at all.",
      answer:"{ city: { $exists: false } }",
      explanation:"$exists checks whether the field is present, not its value." },

    { id:"m015", topic:"null", difficulty:"beginner",
      question:"Find users whose city is null or missing.",
      answer:"{ city: null }",
      explanation:"Matching null also matches documents where the field is absent." },

    { id:"m016", topic:"$regex", difficulty:"beginner",
      question:"Find users whose name starts with 'A'.",
      answer:"{ name: { $regex: \"^A\" } }",
      explanation:"$regex matches text patterns. ^ means 'start of string'." },

    { id:"m017", topic:"$regex", difficulty:"beginner",
      question:"Find users whose email ends with '@gmail.com'.",
      answer:"{ email: { $regex: \"@gmail\\\\.com$\" } }",
      explanation:"$ means 'end of string'. \\\\. escapes the dot so it is a literal dot." },

    { id:"m018", topic:"$regex options", difficulty:"beginner",
      question:"Find products whose name contains 'pro', ignoring case.",
      answer:"{ name: { $regex: \"pro\", $options: \"i\" } }",
      explanation:"$options: \"i\" makes the match case-insensitive." },

    { id:"m019", topic:"array contains", difficulty:"beginner",
      question:"Find products that have the tag 'sale'.",
      answer:"{ tags: \"sale\" }",
      explanation:"Matching an array field by a value checks if the array contains that value." },

    { id:"m020", topic:"$all", difficulty:"beginner",
      question:"Find products that have BOTH tags 'sale' and 'new'.",
      answer:"{ tags: { $all: [\"sale\", \"new\"] } }",
      explanation:"$all requires the array to contain every listed value." },

    { id:"m021", topic:"$size", difficulty:"beginner",
      question:"Find orders that have exactly 2 items.",
      answer:"{ items: { $size: 2 } }",
      explanation:"$size matches arrays with an exact number of elements." },

    { id:"m022", topic:"nested field", difficulty:"beginner",
      question:"Find orders that contain an item with productId 7.",
      answer:"{ \"items.productId\": 7 }",
      explanation:"Use dot notation in quotes to reach inside array/sub-document fields." },

    { id:"m023", topic:"date", difficulty:"beginner",
      question:"Find users created on or after Jan 1, 2024.",
      answer:"{ createdAt: { $gte: ISODate(\"2024-01-01\") } }",
      explanation:"Dates compare with the same operators. Wrap the date in ISODate(\"...\")." },

    { id:"m024", topic:"$and explicit", difficulty:"beginner",
      question:"Find products priced between 50 and 200 using $and.",
      answer:"{ $and: [ { price: { $gte: 50 } }, { price: { $lte: 200 } } ] }",
      explanation:"You rarely need $and (fields AND by default), but it exists for clarity or repeated fields." },

    { id:"m025", topic:"$not", difficulty:"beginner",
      question:"Find products whose price is NOT greater than 100.",
      answer:"{ price: { $not: { $gt: 100 } } }",
      explanation:"$not inverts the inner operator. Here it means price <= 100 (or missing)." },

    /* ================= INTERMEDIATE — aggregation basics ================= */

    { id:"m026", topic:"$match", difficulty:"intermediate",
      question:"Aggregation: keep only orders with status 'Paid'.",
      answer:"[ { $match: { status: \"Paid\" } } ]",
      explanation:"$match filters documents, exactly like the find filter. It should come early to cut data." },

    { id:"m027", topic:"$project", difficulty:"intermediate",
      question:"Aggregation: show only name and email of each user.",
      answer:"[ { $project: { name: 1, email: 1, _id: 0 } } ]",
      explanation:"$project picks fields. 1 keeps, 0 removes. _id: 0 hides the id." },

    { id:"m028", topic:"$sort", difficulty:"intermediate",
      question:"Aggregation: sort products by price, highest first.",
      answer:"[ { $sort: { price: -1 } } ]",
      explanation:"$sort: 1 = ascending, -1 = descending." },

    { id:"m029", topic:"$limit", difficulty:"intermediate",
      question:"Aggregation: get the 5 most expensive products.",
      answer:"[ { $sort: { price: -1 } }, { $limit: 5 } ]",
      explanation:"Sort first, then $limit takes the first N. Order of stages matters." },

    { id:"m030", topic:"$skip", difficulty:"intermediate",
      question:"Aggregation: skip the first 10 users and return the next 5.",
      answer:"[ { $skip: 10 }, { $limit: 5 } ]",
      explanation:"$skip then $limit is how you paginate." },

    { id:"m031", topic:"$count", difficulty:"intermediate",
      question:"Aggregation: count how many users are older than 30.",
      answer:"[ { $match: { age: { $gt: 30 } } }, { $count: \"total\" } ]",
      explanation:"$count outputs one document with the number, under the name you give it." },

    { id:"m032", topic:"$group count", difficulty:"intermediate",
      question:"Aggregation: count how many users live in each city.",
      answer:"[ { $group: { _id: \"$city\", count: { $sum: 1 } } } ]",
      explanation:"$group groups by _id. { $sum: 1 } adds 1 per document = a count. $city reads the field." },

    { id:"m033", topic:"$group sum", difficulty:"intermediate",
      question:"Aggregation: total revenue per user (sum of order totals).",
      answer:"[ { $group: { _id: \"$userId\", revenue: { $sum: \"$total\" } } } ]",
      explanation:"$sum of a field adds that field across the group." },

    { id:"m034", topic:"$group avg", difficulty:"intermediate",
      question:"Aggregation: average product price per category.",
      answer:"[ { $group: { _id: \"$categoryId\", avgPrice: { $avg: \"$price\" } } } ]",
      explanation:"$avg computes the mean of a field per group." },

    { id:"m035", topic:"$group min max", difficulty:"intermediate",
      question:"Aggregation: highest and lowest price per category.",
      answer:"[ { $group: { _id: \"$categoryId\", max: { $max: \"$price\" }, min: { $min: \"$price\" } } } ]",
      explanation:"$max and $min work inside a group just like $sum and $avg." },

    { id:"m036", topic:"$match + $group", difficulty:"intermediate",
      question:"Aggregation: total revenue per user, but only from 'Paid' orders.",
      answer:"[ { $match: { status: \"Paid\" } }, { $group: { _id: \"$userId\", revenue: { $sum: \"$total\" } } } ]",
      explanation:"Filter with $match first, then group. Fewer documents reach $group." },

    { id:"m037", topic:"$group + $sort", difficulty:"intermediate",
      question:"Aggregation: users per city, most populated city first.",
      answer:"[ { $group: { _id: \"$city\", count: { $sum: 1 } } }, { $sort: { count: -1 } } ]",
      explanation:"You can $sort on a field created by $group (here 'count')." },

    { id:"m038", topic:"$group whole", difficulty:"intermediate",
      question:"Aggregation: total revenue across ALL orders (one number).",
      answer:"[ { $group: { _id: null, revenue: { $sum: \"$total\" } } } ]",
      explanation:"_id: null groups everything into a single bucket for a grand total." },

    { id:"m039", topic:"$group distinct", difficulty:"intermediate",
      question:"Aggregation: list the distinct set of cities.",
      answer:"[ { $group: { _id: \"$city\" } } ]",
      explanation:"Grouping by a field with no accumulators returns each distinct value once." },

    { id:"m040", topic:"$avg + $sort + $limit", difficulty:"intermediate",
      question:"Aggregation: the 3 categories with the highest average price.",
      answer:"[ { $group: { _id: \"$categoryId\", avgPrice: { $avg: \"$price\" } } }, { $sort: { avgPrice: -1 } }, { $limit: 3 } ]",
      explanation:"Group to compute, sort by the result, limit to the top 3." },

    { id:"m041", topic:"$project computed", difficulty:"intermediate",
      question:"Aggregation: show product name and price with 18% tax added as 'withTax'.",
      answer:"[ { $project: { name: 1, withTax: { $multiply: [ \"$price\", 1.18 ] } } } ]",
      explanation:"$project can build new fields with math like $multiply, $add, $subtract, $divide." },

    { id:"m042", topic:"$cond", difficulty:"intermediate",
      question:"Aggregation: label each user 'Adult' if age >= 18, else 'Minor'.",
      answer:"[ { $project: { name: 1, group: { $cond: [ { $gte: [ \"$age\", 18 ] }, \"Adult\", \"Minor\" ] } } } ]",
      explanation:"$cond is if/else: [ condition, valueIfTrue, valueIfFalse ]." },

    { id:"m043", topic:"$group push", difficulty:"intermediate",
      question:"Aggregation: for each city, collect the list of user names.",
      answer:"[ { $group: { _id: \"$city\", names: { $push: \"$name\" } } } ]",
      explanation:"$push builds an array of values from every document in the group." },

    { id:"m044", topic:"$group addToSet", difficulty:"intermediate",
      question:"Aggregation: for each user, the distinct set of statuses they used.",
      answer:"[ { $group: { _id: \"$userId\", statuses: { $addToSet: \"$status\" } } } ]",
      explanation:"$addToSet is like $push but keeps only unique values." },

    { id:"m045", topic:"$match on computed count", difficulty:"intermediate",
      question:"Aggregation: cities that have more than 10 users.",
      answer:"[ { $group: { _id: \"$city\", count: { $sum: 1 } } }, { $match: { count: { $gt: 10 } } } ]",
      explanation:"A $match AFTER $group works like SQL HAVING — it filters the grouped results." },

    { id:"m046", topic:"$unwind", difficulty:"intermediate",
      question:"Aggregation: turn each order into one document per item.",
      answer:"[ { $unwind: \"$items\" } ]",
      explanation:"$unwind flattens an array: an order with 3 items becomes 3 documents." },

    { id:"m047", topic:"$unwind + $group", difficulty:"intermediate",
      question:"Aggregation: total quantity sold per product (items is an array).",
      answer:"[ { $unwind: \"$items\" }, { $group: { _id: \"$items.productId\", sold: { $sum: \"$items.qty\" } } } ]",
      explanation:"Unwind the array first, then group on the inner field. Very common pattern." },

    { id:"m048", topic:"$unwind + revenue", difficulty:"intermediate",
      question:"Aggregation: revenue per product = sum of qty * unitPrice.",
      answer:"[ { $unwind: \"$items\" }, { $group: { _id: \"$items.productId\", revenue: { $sum: { $multiply: [ \"$items.qty\", \"$items.unitPrice\" ] } } } } ]",
      explanation:"You can put an expression like $multiply directly inside $sum." },

    { id:"m049", topic:"$sort multi", difficulty:"intermediate",
      question:"Aggregation: sort users by city (A-Z), then by age (youngest first).",
      answer:"[ { $sort: { city: 1, age: 1 } } ]",
      explanation:"List several fields; earlier ones take priority, later ones break ties." },

    { id:"m050", topic:"$project rename", difficulty:"intermediate",
      question:"Aggregation: output each user's name as 'fullName'.",
      answer:"[ { $project: { fullName: \"$name\", _id: 0 } } ]",
      explanation:"Setting a new field to \"$otherField\" copies/renames it." },

    /* ================= ADVANCED — joins, pipelines, shapes ================= */

    { id:"m051", topic:"$lookup", difficulty:"advanced",
      question:"Aggregation: attach each order's user document (join orders -> users).",
      answer:"[ { $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } } ]",
      explanation:"$lookup is a left join. Matches go into a new array field named by 'as'." },

    { id:"m052", topic:"$lookup + $unwind", difficulty:"advanced",
      question:"Aggregation: join orders to users and flatten the joined user to an object.",
      answer:"[ { $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }, { $unwind: \"$user\" } ]",
      explanation:"$lookup returns an array; $unwind turns the single match into a plain sub-document." },

    { id:"m053", topic:"$lookup + $project", difficulty:"advanced",
      question:"Aggregation: list each order's total with the user's name.",
      answer:"[ { $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }, { $unwind: \"$user\" }, { $project: { total: 1, userName: \"$user.name\", _id: 0 } } ]",
      explanation:"After unwinding, reach joined fields with dot notation: $user.name." },

    { id:"m054", topic:"$group + $lookup", difficulty:"advanced",
      question:"Aggregation: revenue per user, then attach the user's name.",
      answer:"[ { $group: { _id: \"$userId\", revenue: { $sum: \"$total\" } } }, { $lookup: { from: \"users\", localField: \"_id\", foreignField: \"_id\", as: \"user\" } }, { $unwind: \"$user\" }, { $project: { revenue: 1, name: \"$user.name\" } } ]",
      explanation:"After $group the key is _id, so join on _id. Aggregate first, enrich after." },

    { id:"m055", topic:"$match after $lookup", difficulty:"advanced",
      question:"Aggregation: orders whose joined user lives in 'Haifa'.",
      answer:"[ { $lookup: { from: \"users\", localField: \"userId\", foreignField: \"_id\", as: \"user\" } }, { $unwind: \"$user\" }, { $match: { \"user.city\": \"Haifa\" } } ]",
      explanation:"You can $match on joined fields once they are unwound." },

    { id:"m056", topic:"$sum conditional", difficulty:"advanced",
      question:"Aggregation: for each user, count Paid vs Pending orders in one document.",
      answer:"[ { $group: { _id: \"$userId\", paid: { $sum: { $cond: [ { $eq: [ \"$status\", \"Paid\" ] }, 1, 0 ] } }, pending: { $sum: { $cond: [ { $eq: [ \"$status\", \"Pending\" ] }, 1, 0 ] } } } } ]",
      explanation:"$cond turns a test into 1 or 0, and $sum adds them — conditional counting." },

    { id:"m057", topic:"$bucket", difficulty:"advanced",
      question:"Aggregation: group products into price buckets 0-50, 50-100, 100+.",
      answer:"[ { $bucket: { groupBy: \"$price\", boundaries: [ 0, 50, 100 ], default: \"100+\", output: { count: { $sum: 1 } } } } ]",
      explanation:"$bucket sorts values into ranges you define. 'default' catches anything outside." },

    { id:"m058", topic:"$facet", difficulty:"advanced",
      question:"Aggregation: in one query, get total count AND the 5 most expensive products.",
      answer:"[ { $facet: { total: [ { $count: \"n\" } ], top5: [ { $sort: { price: -1 } }, { $limit: 5 } ] } } ]",
      explanation:"$facet runs several sub-pipelines on the same input and returns all results together." },

    { id:"m059", topic:"$addFields", difficulty:"advanced",
      question:"Aggregation: add a 'lineCount' field = number of items in each order.",
      answer:"[ { $addFields: { lineCount: { $size: \"$items\" } } } ]",
      explanation:"$addFields keeps all existing fields and adds new ones. $size counts array length." },

    { id:"m060", topic:"$group + $avg + $round", difficulty:"advanced",
      question:"Aggregation: average order total per status, rounded to 2 decimals.",
      answer:"[ { $group: { _id: \"$status\", avg: { $avg: \"$total\" } } }, { $project: { avg: { $round: [ \"$avg\", 2 ] } } } ]",
      explanation:"$round trims decimals. Compute in $group, then tidy the number in $project." },

    { id:"m061", topic:"$dateToString", difficulty:"advanced",
      question:"Aggregation: revenue per day (group orders by their date, YYYY-MM-DD).",
      answer:"[ { $group: { _id: { $dateToString: { format: \"%Y-%m-%d\", date: \"$orderDate\" } }, revenue: { $sum: \"$total\" } } }, { $sort: { _id: 1 } } ]",
      explanation:"$dateToString formats a date so you can group by day, month, etc." },

    { id:"m062", topic:"top-N per group", difficulty:"advanced",
      question:"Aggregation: the single most expensive product in each category.",
      answer:"[ { $sort: { price: -1 } }, { $group: { _id: \"$categoryId\", top: { $first: \"$$ROOT\" } } } ]",
      explanation:"Sort first; $first inside $group grabs the top document. $$ROOT means the whole document." },

    { id:"m063", topic:"$replaceRoot", difficulty:"advanced",
      question:"Aggregation: after taking $first product per category, promote it to be the top-level document.",
      answer:"[ { $sort: { price: -1 } }, { $group: { _id: \"$categoryId\", top: { $first: \"$$ROOT\" } } }, { $replaceRoot: { newRoot: \"$top\" } } ]",
      explanation:"$replaceRoot makes a sub-document the new root, so results look like normal product docs." },

    { id:"m064", topic:"$group array + $filter", difficulty:"advanced",
      question:"Aggregation: for each order, keep only items with qty greater than 1.",
      answer:"[ { $project: { bigItems: { $filter: { input: \"$items\", as: \"it\", cond: { $gt: [ \"$$it.qty\", 1 ] } } } } } ]",
      explanation:"$filter keeps array elements that match a condition. $$it is the current element." },

    { id:"m065", topic:"$map", difficulty:"advanced",
      question:"Aggregation: for each order, build an array of each item's line total (qty * unitPrice).",
      answer:"[ { $project: { lineTotals: { $map: { input: \"$items\", as: \"it\", in: { $multiply: [ \"$$it.qty\", \"$$it.unitPrice\" ] } } } } } ]",
      explanation:"$map transforms every array element into something new, here a computed number." },

    { id:"m066", topic:"$reduce", difficulty:"advanced",
      question:"Aggregation: compute each order's grand total by summing its items.",
      answer:"[ { $project: { grandTotal: { $reduce: { input: \"$items\", initialValue: 0, in: { $add: [ \"$$value\", { $multiply: [ \"$$this.qty\", \"$$this.unitPrice\" ] } ] } } } } } ]",
      explanation:"$reduce folds an array into one value. $$value is the running result, $$this the current element." }
  ]
};
