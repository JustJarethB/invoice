import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
// Set the AWS Region.
const CONFIG = { region: "us-east-1", apiVersion: '2012-08-10', credentials: { accessKeyId: 'AKIA2HYZON2W53KCINJH', secretAccessKey: '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' } };
// Create an Amazon DynamoDB service client object.
const db = new DynamoDBClient(CONFIG);
const marshallOptions = { convertClassInstanceToMap: true, removeUndefinedValues: true };

const formatInvoiceForDB = ({ from, to, id, date, lineItems, purchaseOrder, emailAddress, phoneNumber, payment }) => ({
    // be more verbose with from, to, lineItems, payment
    from,
    to,
    invoice: id,
    taxDate: date,
    //   logo,
    lineItems: lineItems.slice(0, -1),
    purchaseOrder,
    emailAddress,
    phoneNumber,
    payment,
})



const saveInvoice = async (invoice) => {
    const params = {
        TableName: 'invoice-one',
        Item: marshall(formatInvoiceForDB(invoice), marshallOptions)

    }
    console.log("PARAMS")
    console.log(params);
    try {
        const data = await db.send(new PutItemCommand(params));
        console.log(data);
        if (data.$metadata.httpStatusCode === 200) {
            alert("Saved Successfully");
        } else {
            alert("Unknown Error Code please check logs")
        }
        return data;
    } catch (err) {
        alert("Something went wrong please check logs");
        console.warn(err);
    }
    return null;
}

class Address {
    constructor(recipientName, street, city, county, postCode) {
        this.name = recipientName;
        this.streetAddress = street;
        this.city = city;
        this.county = county;
        this.postCode = postCode;
    }
}

const getAllClients = () => [
    {
        displayName: "Soul Survivor Watford",
        defaultTerms: null,
        address: new Address("Soul Survivor Watford", "Warehouse 5, Graycaine Road", "Watford", "Hertfordshire", "WD24 7GP")

    },
    {
        displayName: "TBNUK",
        defaultTerms: null,
        address: new Address("VSC", "226 Church Road", "Neasden", "London", "NW10 9NR")

    },
    {
        displayName: "Bobcat TV",
        defaultTerms: null,
        address: new Address("Bobcat TV", "12 Roundmead Close", "Loughton", "Essex", "IG10 1QD")

    },
    {
        displayName: "ESS",
        defaultTerms: null,
        address: new Address("ESS Hire (2016) Ltd", "7 Paynes Park", "Hitchin", "Hertfordshire", "SG5 1EH")

    },
]

const addresses = [
    new Address('Jareth Bower', "26 Hilton Avenue", "Dunstable", "Bedfordshire", "LU6 3QF"),
    new Address('Jareth Bower', "15 Langland Court", "Northwood", "Hillingdon", "HA6 2NH")
]
const getDefaultAddress = () => addresses[1]

export default {
    getAllClients,
    getDefaultAddress,
    saveInvoice
}