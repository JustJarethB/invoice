class Address {
    constructor(recipientName, addressLine, postCode) {
        this.name = recipientName;
        this.address = addressLine;
        this.postCode = postCode;
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
]

const getDefaultAddress = () => new Address('Jareth Bower', "26 Hilton Avenue\nDunstable\nBedfordshire", "LU6 3QF")

export default {
    getAllClients,
    getDefaultAddress
}