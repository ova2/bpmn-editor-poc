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

	public static createColor( colorString:string):Color
	{

		let bigint:number = parseInt(colorString.substr(1), 16);
		let r:number = (bigint >> 16) & 255;
		let g:number = (bigint >> 8) & 255;
		let b:number = bigint & 255;

		return new Color( r, g, b );
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
		return "rgb(" + this.red + "," + this.green + "," + this.blue  + ")";
	}


	public toRGBAString(): string
	{
		return "rgb(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
	}


	public toHex():string
	{
		let r = Math.max(0, Math.min(~~this.red, 255));
		let g = Math.max(0, Math.min(~~this.green, 255));
		let b = Math.max(0, Math.min(~~this.blue, 255));

		return '#' + ('00000' + (r << 16 | g << 8 | b).toString(16)).slice(-6);
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
