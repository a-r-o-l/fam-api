import { Account } from "./Account";
import { Apartment } from "./Apartment";
import { Contract } from "./Contract";
import { Renter } from "./Renter";
import { Building } from "./Building";
import { Payment } from "./Payment";
import { Subscription } from "./Subscription";

//Account
Account.hasMany(Building, { foreignKey: "account_id" });
Building.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Apartment, { foreignKey: "account_id" });
Apartment.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Renter, { foreignKey: "account_id" });
Renter.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Contract, { foreignKey: "account_id" });
Contract.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Payment, { foreignKey: "account_id" });
Payment.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

//Contracts
Contract.belongsTo(Renter, { foreignKey: "renter_id", targetKey: "id" });
Contract.belongsTo(Apartment, { foreignKey: "apartment_id", targetKey: "id" });

Renter.hasMany(Contract, { foreignKey: "renter_id", sourceKey: "id" });
Apartment.hasMany(Contract, { foreignKey: "apartment_id", sourceKey: "id" });

//Building
Building.hasMany(Apartment, { foreignKey: "building_id", sourceKey: "id" });
Apartment.belongsTo(Building, { foreignKey: "building_id", targetKey: "id" });

//Payments
Payment.belongsTo(Contract, { foreignKey: "contract_id", targetKey: "id" });
Contract.hasMany(Payment, { foreignKey: "contract_id", sourceKey: "id" });

//Subscriotions
Subscription.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });
Account.hasMany(Subscription, { foreignKey: "account_id", sourceKey: "id" });
