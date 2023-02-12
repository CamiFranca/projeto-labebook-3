export class Posts {

    constructor (
        private id: string,
        private creatorId: string,
        private content: string,
        private likes : number,
        private deslikes: number,
        private createdAt: string,
        private updateAt: string
    ){}

    public getId():string {
        return this.id
    }

    public setId(value : string):void {
       this.id = value
    }
    public getCreator_id():string {
        return this.creatorId
    }

    public setName(value : string):void {
       this.creatorId = value
    }
    public getContent():string {
        return this.content
    }

    public setContent(value : string):void {
       this.content = value
    }
    public getLikes(): number {
        return this.likes
    }

    public setLikes(value :number):void {
       this.likes = value
    }

    public getDeslikes(): number {
        return this.deslikes
    }

    public setDeslikes(value :number):void {
       this.deslikes = value
    }
    public getCreated_at(): string {
        return this.createdAt
    }

    public setCreated_at(value :string):void {
       this.createdAt = value
    }
    public getUpdate_at(): string {
        return this.updateAt
    }

    public setUpdate_at(value :string):void {
       this.updateAt = value
    }

} 