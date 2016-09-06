
import {ShapeElement} from "./ShapeElement";
import {UId} from "../../../inspire/develop/util/UId";
import {Utils} from "../../../inspire/develop/util/Utils";
import {NamedElement} from "./NamedElement";
import {JsonObject, JsonMember, TypedJSON} from "../typed-json";
@JsonObject
export class NodeElement extends NamedElement
{

    constructor( name:string, uId?:string)
    {
        super(name, uId);
    }

    public dump( indent:number)
    {
        let indentStr:string = Utils.indent(indent, " " );

        console.log(indentStr + this.getName() + " UID: " + this.getUId() );

        for( let shapeElement of this.shapeElements)
        {
            shapeElement.dump( indent + 1 );
        }


        for( let childElement of this.childList)
        {
            childElement.dump( indent + 2) ;
        }
    }

    public getParent(): NodeElement
    {
        return this.parent;
    }

    public getChildList(): Array<NodeElement>
    {
        return this.childList;
    }


    public add(child: NodeElement)
    {
        this.childList.push(child);
        child.parent = this;
    }

    public remove(child: NodeElement)
    {
        let index = this.childList.indexOf(child);
        if (index != -1)
        {
            this.childList.splice(index);
            child.parent = null;
        }
    }


    public getShapeElements():Array<ShapeElement>
    {
        return this.shapeElements;
    }

    // our ShapeElements List
    @JsonMember
    private shapeElements:Array<ShapeElement> = new Array<ShapeElement>();

    // ChildList
    @JsonMember
    private childList: Array<NodeElement> = new Array<NodeElement>();

    // Parent Element
    @JsonMember
    private parent: NodeElement;
}
