import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const CONFIG = { region: "us-east-1", apiVersion: '2012-08-10', credentials: { accessKeyId: 'AKIA2HYZON2W53KCINJH', secretAccessKey: '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' } };
// Create an Amazon DynamoDB service client object.
const db = new DynamoDBClient(CONFIG);

const DB_FIELD_TYPE = {
    "String": 'S',
    "Number": 'N',
    "Binary": 'B',
    "StringSet": 'SS',
    "NumberSet": 'NS',
    "BinarySet": 'BS',
    "Map": 'M',
    "Array": 'L',
    "List": 'L',
    "Null": 'NULL',
    "Bool": 'BOOL'
}

const makeField = (type, value) => ({
    [type]: value
})

const makeLineItem = lineItem => ({
    date: makeField(DB_FIELD_TYPE.String, lineItem.date),
    name: makeField(DB_FIELD_TYPE.String, lineItem.name),
    // description: makeField(DB_FIELD_TYPE.String, lineItem.description),
    qty: makeField(DB_FIELD_TYPE.Number, lineItem.qty),
    unitPrice: makeField(DB_FIELD_TYPE.Number, lineItem.unitPrice),
    type: makeField(DB_FIELD_TYPE.Number, lineItem.type)
    // vatRate: makeField(DB_FIELD_TYPE.Number, lineItem.vatRate),
})

const makePayment = payment => {
    const terms = makeField(DB_FIELD_TYPE.String, payment.terms);
    const methodInner = {
        type: makeField(DB_FIELD_TYPE.String, payment.method.type),
        bankName: makeField(DB_FIELD_TYPE.String, payment.method.bankName),
        sortCode: makeField(DB_FIELD_TYPE.String, payment.method.sortCode),
        number: makeField(DB_FIELD_TYPE.String, payment.method.number),
    }
    const method = makeField(DB_FIELD_TYPE.Map, methodInner);
    return makeField(DB_FIELD_TYPE.Map, { terms, method })
}

const convertDataToDBTable = ({ from, to, id, date, lineItems, purchaseOrder, emailAddress, phoneNumber, payment }) => ({
    // be more verbose with from and to
    from: from.toDatabase(),
    to: to.address ? to.toDatabase() : { [DB_FIELD_TYPE.Null]: true },
    invoice: makeField(DB_FIELD_TYPE.String, id),
    taxDate: makeField(DB_FIELD_TYPE.String, date),
    //   logo,
    lineItems: makeField(DB_FIELD_TYPE.List, lineItems.slice(0, -1).map(line => makeField(DB_FIELD_TYPE.Map, makeLineItem(line)))),
    purchaseOrder: makeField(DB_FIELD_TYPE.String, purchaseOrder),
    emailAddress: makeField(DB_FIELD_TYPE.String, emailAddress),
    phoneNumber: makeField(DB_FIELD_TYPE.String, phoneNumber),
    payment: makePayment(payment)
})



const saveInvoice = async (invoice) => {
    // const { id } = invoice;
    console.log(invoice)
    const params = {
        TableName: 'invoice-one',
        Item: convertDataToDBTable(invoice)

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
    constructor(recipientName, addressLine, postCode) {
        this.name = recipientName;
        this.address = addressLine;
        this.postCode = postCode;
    }

    toDatabase() {
        const { name, address, postCode } = this;
        return makeField(DB_FIELD_TYPE.Map, {
            name: makeField(DB_FIELD_TYPE.String, name),
            address: makeField(DB_FIELD_TYPE.String, address),
            postCode: makeField(DB_FIELD_TYPE.String, postCode),
        });
    }
}

const getAllClients = () => [
    {
        displayName: "Soul Survivor Watford",
        defaultTerms: null,
        address: new Address("Soul Survivor Watford", "Warehouse 5, Graycaine Road\nWatford\nHertfordshire", "WD24 7GP")

    },
    {
        displayName: "TBNUK",
        defaultTerms: null,
        address: new Address("VSC", "226 Church Road\nNeasden\nLondon", "NW10 9NR")

    },
    {
        displayName: "Bobcat TV",
        defaultTerms: null,
        address: new Address("Bobcat TV", "12 Roundmead Close\nLoughton\nEssex", "IG10 1QD")

    },
    {
        displayName: "ESS",
        defaultTerms: null,
        address: new Address("ESS Hire (2016) Ltd", "7 Paynes Park\nHitchin\nHertfordshire", "SG5 1EH")

    },
]

const addresses = [
    new Address('Jareth Bower', "26 Hilton Avenue\nDunstable\nBedfordshire", "LU6 3QF"),
    new Address('Jareth Bower', "15 Langland Court\nNorthwood\nHillingdon", "HA6 2NH")
]
const getDefaultAddress = () => addresses[1]

export default {
    getAllClients,
    getDefaultAddress,
    saveInvoice
}