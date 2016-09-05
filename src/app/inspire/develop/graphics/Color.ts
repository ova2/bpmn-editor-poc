import {Resource} from "./Resource";
export class Color extends Resource
{

	constructor(red: number, green: number, blue: number, alpha?: number)
	{
		super();
		this.red = red;
		this.green = green;
		this.blue = blue;
		if (alpha != null)
		{
			this.alpha = alpha;
		} else
		{
			this.alpha = 0;
		}
	}

	public getRed(): number
	{
		return this.red;
	}

	public getGreen(): number
	{
		return this.green;
	}

	public getBlue(): number
	{
		return this.blue;
	}

	public getAlpha(): number
	{
		return this.alpha;
	}

	public toRGBString(): string
	{
		return "rgb(" + this.red + "," + this.green + "," + this.blue + "," + ")";
	}


	public toRGBAString(): string
	{
		return "rgb(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
	}


// Red
	private red: number;

// Green
	private green: number;

// Blue
	private blue: number;

// Alpha
	private alpha: number;
}
