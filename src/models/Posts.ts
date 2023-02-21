import { PostDB, PostModel } from "../type"

export class Posts {

    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private deslikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }
    public getCreator_id(): string {
        return this.creatorId
    }

    public setName(value: string): void {
        this.creatorId = value
    }
    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }
    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public getDeslikes(): number {
        return this.deslikes
    }

    public setDeslikes(value: number): void {
        this.deslikes = value
    }
    public getCreated_at(): string {
        return this.createdAt
    }

    public setCreated_at(value: string): void {
        this.createdAt = value
    }
    public getUpdate_at(): string {
        return this.updatedAt
    }

    public setUpdate_at(value: string): void {
        this.updatedAt = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            deslikes: this.deslikes,
            created_at: this.createdAt,
            update_at: this.updatedAt
        }
    }
    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content:this.content ,
            likes: this.likes,
            deslikes: this.deslikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt, 
            creator:{
                id:this.creatorId,
                name:this.creatorName 
            }
        }
    }
    
}