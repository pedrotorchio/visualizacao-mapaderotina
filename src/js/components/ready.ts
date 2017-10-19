export class Ready{
	message: string
	constructor(message:string){
		this.message = message;
	}

	greet(){
		console.log('Hello, ' + this.message);
	}
}