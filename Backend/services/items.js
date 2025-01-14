const db = require("./db");

async function getItems() {
    const rows = await db.query(
        `SELECT * FROM items`
    )
    return rows?rows:[];
}

async function getMovieByID(id) {
    const rows = await db.query(
        `SELECT * FROM items WHERE id = ?`,
        [id]
    )
    return rows?rows[0]:{};
}

async function createItem(item) {


    console.log("Item: ", item);
    const result =await db.query(
        `INSERT INTO Items (name, type, material, price, image_url)
        VALUES (?, ?, ?, ?, ?)`,
        [item.name, item.type, item.material, item.price, item.image_url]
      
    )
    let message = "item not created"
    if (result.affectedRows) {
        message = "item created"
    }
    return {message}
}

async function updateItem(id, item) {
    const result = await db.query(
        `UPDATE items SET name = ?, type = ?, material = ?, price = ?, image_url = ? WHERE id = ?`,
        [item.name, item.type, item.material, item.price, item.image_url, id]
    )
    let message = "item not updated"
    if (result.affectedRows) {
        message = "item updated"
    }
    return {message}
}

async function deleteItem(id) {
    const result = await db.query(
        `DELETE FROM items WHERE id = ?`,
        [id]
    )
    let message = "item not deleted"
    if (result.affectedRows) {
        message = "item deleted"
    }
    return {message}
}

async function patchItem(id, item) {
   let fields = Object.keys(item).map(
    (field) => field+" = ?"
   ).join(", ")

   let updateValues = Object.values(item);
   updateValues.push(id);
   console.log("Fields: ",fields);
   console.log("UpdateValues: ",updateValues);

   
}


module.exports = {
    getItems,
    getItemByID,
    createItem,
    updateItem,
    deleteItem,
    patchItem
};