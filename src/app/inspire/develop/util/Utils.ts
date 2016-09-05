export class Utils
{
	public static indent( len:number, template:string ):string
	{
		let retString:string = "";
		for( var i:number=0;i<len;i++)
		{
			retString = retString.concat(template);
		}
		return retString;
	}
}
