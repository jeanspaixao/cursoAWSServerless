"use strict";

const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient();

const updatingItem = async (event) => {
    
    const {itemStatus} = JSON.parse(event.body)
    const {id} = event.pathParameters

    try {
        await ddb.update({
                TableName: "NewItemTable",
                Key: {id},
                UpdateExpression: 'set itemStatus = :itemStatus',
                ExpressionAttributeValues: { 
                ':itemStatus' : itemStatus
            },
            ReturnValues: "ALL_NEW"
        }).promise();
    } catch (error) {
        console.log(error)
    }
 

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Update complete with success"
        })
    };
};


module.exports = {

    handler: updatingItem
};