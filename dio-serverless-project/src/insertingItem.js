"use strict";

const {v4} = require("uuid");

const AWS = require("aws-sdk");

const insertingItem = async (event) => {

    const { item } = JSON.parse(event.body);

    const creationDate = new Date().toISOString();

    const id = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newItem = {
        id,
        item,
        creationDate,
        itemStatus: "active"
    };

    await dynamoDB.put(
        {
            TableName: "NewItemTable",
            Item: newItem
        }
    ).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };
};


module.exports = {

    handler: insertingItem
};