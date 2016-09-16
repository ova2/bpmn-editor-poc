import {GraphicsEditor} from "../GraphicsEditor";
export class EditPolicy
{
	public get graphicsEditor(): GraphicsEditor
	{
		return this._graphicsEditor;
	}
	public onActivate( graphicsEditor:GraphicsEditor):void
	{
		this._graphicsEditor = graphicsEditor;
	}

	public onDeactivate(graphicsEditor:GraphicsEditor ):void
	{
		this._graphicsEditor = null;
	}



	private _graphicsEditor:GraphicsEditor;
}
