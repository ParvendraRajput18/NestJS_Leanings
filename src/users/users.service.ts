import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { NotFoundError } from 'rxjs';
import { error } from 'console';

@Injectable()
export class UsersService {
    private users: any = [
        { id: 1, name: "Alice", email: "alice@example.com", role: "INTERN" },
        { id: 2, name: "Bob", email: "bob@example.com", role: "ENGINEER" },
        { id: 3, name: "Charlie", email: "charlie@example.com", role: "ADMIN" },
        { id: 4, name: "Diana", email: "diana@example.com", role: "INTERN" },
        { id: 5, name: "Eve", email: "eve@example.com", role: "ENGINEER" },
        { id: 6, name: "Frank", email: "frank@example.com", role: "ADMIN" },
        { id: 7, name: "Grace", email: "grace@example.com", role: "INTERN" },
        { id: 8, name: "Hank", email: "hank@example.com", role: "ENGINEER" },
        { id: 9, name: "Ivy", email: "ivy@example.com", role: "ADMIN" },
        { id: 10, name: "Jack", email: "jack@example.com", role: "INTERN" },
    ];

    findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
        const validRoles = ['ADMIN', 'ENGINEER', 'INTERN']; // List of valid roles
        if (!role || !validRoles.includes(role)) {
            throw new NotFoundException('Invalid or missing role');
        }
        return this.users.filter(user => user.role === role);
    }
    

    findOne(id: number) {

        const userWithSpecificID = this.users.find(item => item.id === id);
        if (!userWithSpecificID) {
            throw new NotFoundException('User is missing, user not found')
        }
        return userWithSpecificID;

    }
    create(createUserDto: CreateUserDto) {
        const usersWithHighestID = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersWithHighestID[0].id + 1,
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }
    // create(users: { id: number, name: string, email: string, role: 'ADMIN' | 'ENGINEER' | 'INTERN' }) {

    //     const usersWithGihhestID = [...this.users].sort((a, b) => b.id - a.id);
    //     const newUser = {
    //         id: usersWithGihhestID[0].id + 1 || 1,
    //         ...users
    //     }
    //     this.users.push(newUser)
    //     return newUser

    // }
    update(id: number, updatedUserDto: CreateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUserDto }

            }
            return user;
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return { removeUser };
    }

}

