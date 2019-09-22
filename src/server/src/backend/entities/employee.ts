import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, JoinTable} from "typeorm";




@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public employee_name!: string;

    @Column()
    public employee_salary!: string;

    @Column()
    public employee_age!: string;

    @Column()
    public profile_image!: string;

}
