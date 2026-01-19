# SMT Labs Inventory App


### Install Frontend Dependencies

``` bash
cd app
nvm install 22
npm install
```

### Install Backend Dependencies

``` bash
cd backend
npm install
```

## Database Setup

-   Make sure **MongoDB** is running locally
-   Use **MongoDB Compass** for a better visual understanding of the
    database

``` bash
mongod
```

## Running the Project

### Start Backend Server

``` bash
cd backend
npm run dev
```

### Start Frontend App

``` bash
cd app
npm run dev
```

## Application Flow

1.  Create an account\
2.  Create an organization (you become the **Owner**)\
3.  Go to the **Teams** page\
4.  Add members to your organization
    -   Members added here will have the **Staff** role\
5.  Start managing products, categories, orders, and inventory

## Roles & Permissions

### Owner

-   Full access
-   Manage organization, members, products, and orders

### Staff

-   Limited access
-   Can operate only within assigned organization

## Key Points to notee

-   Orders automatically update inventory stock
-   Cancelling an order restores stock
-   different organization can reuse same product SKU codes
