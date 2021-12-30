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
    getDefaultAddress
}