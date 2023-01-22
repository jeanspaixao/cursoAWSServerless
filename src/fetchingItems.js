"use strict";

const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient();

const fetchingItems = async (event) => {

    let items;

    try {
        const resultItems = await ddb.scan(
            {
                TableName: "NewItemTable"
            }
        ).promise();
        
        items = resultItems.Items;

    } catch (error) {
        console.log(error)
    }
 

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    };
};


module.exports = {

    handler: fetchingItems
};