
class Input
{
	#keyStates;

	// For removal
	#boundKeyDownHandler;
	#boundKeyUpHandler;

	constructor(element)
	{
		this.#keyStates = [];

		element.addEventListener("keydown", this.#boundKeyDownHandler = this.#KeyDownHandler.bind(this));
		element.addEventListener("keyup", this.#boundKeyUpHandler = this.#KeyUpHandler.bind(this));
		

	}

	
	#KeyDownHandler(e)
	{
		this.#keyStates[e.location] = true;
		console.log(e);
	}

	#KeyUpHandler(e)
	{
		this.#keyStates[e.location] = false;
	}
}

