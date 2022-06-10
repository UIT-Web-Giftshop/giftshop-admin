import { BooleanField, Datagrid, DateField, EmailField, List, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="firstName" />
            <TextField source="lastName" />
            <DateField source="dateOfBirth" />
            <TextField source="phoneNumber" />
            <TextField source="address" />
            <BooleanField source="isActive" />
            <DateField source="createdAt" />
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="role" />
            <TextField source="imageUrl" />
        </Datagrid>
    </List>
);