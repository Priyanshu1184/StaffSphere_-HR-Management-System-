# **HR System**

## **Overview**
This HR system is designed to manage various HR functions efficiently. The system has two main roles: Admin and Employee. The Admin side is responsible for managing events, leave requests, employees, and payroll (the payroll functionality is under development). The Employee side allows employees to manage their history, request leaves, update their details, and check events.

## **Features**

### **Admin Side**
- **Create and Delete Event**: Admins can create new events and delete existing ones.
- **Accept or Reject Leave**: Admins have the authority to accept or reject leave requests made by employees.
- **Add and Delete Employee**: Admins can add new employees to the system and delete existing ones.
- **Add Payroll**: This feature is under development and will allow admins to manage payroll for employees.

### **Employee Side**
- **Add History**: Employees can add personal history records.
- **Add Leave Request**: Employees can submit leave requests which are then reviewed by the admin.
- **Update Details**: Employees can update their personal details.
- **Check Events**: Employees can view events created by the admin.

## **Installation**

### **Backend (Node.js)**

1. **Navigate to the server directory**:
    ```bash
    cd server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
    - Configure your database settings in `config/database.js`.
    - Run migrations and seeders if necessary:
      ```bash
      npx sequelize-cli db:migrate
      npx sequelize-cli db:seed:all
      ```

4. **Start the server**:
    ```bash
    npm start
    ```

### **Frontend (React)**

1. **Navigate to the client directory**:
    ```bash
    cd client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    - Create a `.env` file in the root directory of your client project and add necessary environment variables, such as the API endpoint for your backend server.

4. **Start the development server**:
    ```bash
    npm run dev
    ```

# **Getting Started**

To get started with the application, follow the steps below:

## 1. Register an Admin Account

Navigate to [http://localhost:5173/adminRegister](http://localhost:5173/adminRegister) in your web browser. Here, you can register an admin account to access the administrative features of the application.

## 2. Access the Admin Dashboard

After registering the admin account, you can log in using the credentials you provided during registration. Once logged in, you will have access to the admin dashboard, where you can manage employees, training modules, and other administrative tasks.

## 3. Create Employee Accounts

From the admin dashboard, you can create employee accounts by providing the necessary details such as name, email, department, etc. These accounts will be used by employees to access their profiles and training modules.

## 4. Employee Login

Employees can log in to the system using the credentials provided by the admin. They can access their profiles, view assigned training modules, mark modules as completed, and perform other tasks related to their training.

## **Additional Information**

For any further assistance or troubleshooting, please refer to the documentation or contact the system administrator.

## **Usage**

### Admin Interface
1. **Login**: Admins log in using their credentials.
2. **Dashboard**: Access the admin dashboard to manage the system.
3. **Events Management**:
    - Create Event: Fill in the event details and save.
    - Delete Event: Select an event to delete from the list.
4. **Leave Management**:
    - Review leave requests and either accept or reject them.
5. **Employee Management**:
    - Add Employee: Fill in the employee details and save.
    - Delete Employee: Select an employee to delete from the list.
6. **Payroll Management**: (Upcoming feature)
    - Will allow admins to add and manage payroll information (Still in progress).

### **Employee Interface**
1. **Login**: Employees log in using their credentials.
2. **Dashboard**: Access the employee dashboard to manage personal information and requests.
3. **History Management**:
    - Add History: Fill in the history details and save.
4. **Leave Requests**:
    - Add Leave Request: Fill in the leave request details and submit.
5. **Update Personal Details**:
    - Update any personal details and save changes.
6. **Events**:
    - View the list of events created by the admin.

## **Contributing**
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add your message here"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## **Contact**
For any inquiries or feedback, please contact [sahoopriyanshu1184@gmail.com].
