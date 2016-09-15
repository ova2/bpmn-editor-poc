import {GraphicsEditor} from "../GraphicsEditor";
export abstract class AbstractController
{
	public get graphicsEditor(): GraphicsEditor
	{
		return this._graphicsEditor;
	}

	constructor( graphicsEditor:GraphicsEditor)
	{
		this._graphicsEditor = graphicsEditor;
	}

	public abstract handleMouseEvent(mouseEvent:MouseEvent):void;

	private _graphicsEditor:GraphicsEditor;
}
