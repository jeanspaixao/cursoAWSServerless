"use strict";

const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient();



const fetchingItem = async (event) => {
    
    const {id} = event.pathParameters

    let item;

    try {
        const resultItem = await ddb.get(
            {
                TableName: "NewItemTable",
                Key: {id}
            }
        ).promise();
        
        item = resultItem.Item;

    } catch (error) {
        console.log(error)
    }
 

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    };
};


module.exports = {

    handler: fetchingItem
};