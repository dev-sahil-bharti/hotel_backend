# Backend URL
[https://hotel-backend-1-vdzy.onrender.com]

# Hotel Application

The **Hotel Bakend** application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database. This application manages information related to persons (staff) and menu items. It exposes specific endpoints to handle CRUD (Create, Read, Update, Delete) operations for both persons and menu items.

## Endpoints

### Persons

- **Add a Person:**

  - Endpoint: `POST /person/signup`
  - Description: Adds a person to the system with details such as name, role, etc.

- **Get All Persons:**

  - Endpoint: `GET /fetchPerson`
  - Description: Retrieves a list of all persons in the system.

- **Get Persons by Work Type:**

  - Endpoint: `GET /fetechPerson/:workType`
  - Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).

- **Update a Person:**

  - Endpoint: `PUT /personUpdate/:id`
  - Description: Updates the details of a specific person identified by their ID.

- **Delete a Person:**
  - Endpoint: `DELETE /deletePerson/:id`
  - Description: Deletes a person from the system based on their ID.

### Menu Items

- **Add a Menu Item:**

  - Endpoint: `POST /menueItems`
  - Description: Adds a menu item to the system with details such as name, price, taste, etc.

- **Get All Menu Items:**

  - Endpoint: `GET /fetchMenuItems`
  - Description: Retrieves a list of all menu items in the system.

- **Get Menu Items by type (Veg, Non-Veg):**

  - Endpoint: `GET /menuItems/:type`
  - Description: Retrieves a list of menu items based on their taste (e.g.,Veg, Non-Veg).

- **Update a Menu Item:**

  - Endpoint: `PUT /updateMenuItems/:id`
  - Description: Updates the details of a specific menu item identified by its ID.

- **Delete a Menu Item:**
  - Endpoint: `DELETE /deleteMenuItems/:id`
  - Description: Deletes a menu item from the system based on its ID.

## Data Models

### Person

The `Person` data model represents information about staff members in the hotel.

- **Fields:**

  - `name`: String (Person's name)
  - `age`: Number (Person's age)
  - `work`: Enum (Role in the hotel, such as chef, waiter, manager)
  - `mobile`: String (Person's mobile number)
  - `email`: String (Person's email address, unique)
  - `address`: String (Person's address)
  - `salary`: Number (Person's salary)

- **Example:**
  ```json
  {
    "name": "Sahil Singh",
    "age": 19,
    "work": "manager",
    "mobile": "8298648388",
    "email": "sahil@gmail.com",
    "address": "Lucknow, India",
    "salary": 65000
  }
  ```

### Menu Item

The `MenuItem` data model represents information about menu items available in the hotel.

- **Fields:**

  - `name`: String (Item's name)
  - `price`: Number (Item's price)
  - `taste`: Enum (Item's taste, such as sweet, spicy, sour)
  - `type`: Boolean (Veg, and Non-Veg)
  - `isAvailable`: Boolean (by defualt `true`)

- **Example:**
  ```json
  {
    "name": "Chhole-Bhature",
    "price": 50,
    "type": "Veg",
    "isAvailable": true
  }
  ```

## Usage

1. **Install Dependencies:**
   ```bash
   npm install
   ```
