import {Utils} from "../../../util/Utils";
import {ECore} from "../interfaces/EModelElement";
import ECoreFactory = ECore.ECoreFactory;
import EPackage = ECore.EPackage;
import {EMFUtils} from "../interfaces/EMFUtils";



class Context
{

}
export class XMLProcessor
{

	private _xmlDocument:Document;
	constructor( xmlDocument:Document )
	{
		this._xmlDocument = xmlDocument;

		let eCoreFactory:ECoreFactory = ECoreFactory.getInstance();

		let ePackage:EPackage = eCoreFactory.parseDocumnet( xmlDocument );

		EMFUtils.getInstance().dump(ePackage,0);
	}

	dumpNodeAttributes( node:Node, indent:number ):void
	{
		let indentString:string = Utils.indent(indent, " ");

		let namedNodeMap:NamedNodeMap = node.attributes;
		if( namedNodeMap != null ) {
			for (let i: number = 0; i < namedNodeMap.length; i++) {
				let attribute: Attr = namedNodeMap.item(i);
				console.log(`${indentString}Attr: ${attribute.nodeName} = ${attribute.nodeValue}`);
			}
		}
	}

	handleElementNode( node:Node, context:Context, indent:number)
	{
		let indentString:string = Utils.indent(indent, " ");
		console.log(`${indentString} Handle Element Node: ${node.localName} of Type ${this.getNodeType(node)}`);


	}

	handleAttributeNode( node:Node, context:Context, indent:number)
	{
		let indentString:string = Utils.indent(indent, " ");
		console.log(`${indentString} Handle Attribute Node: ${node.localName} of Type ${this.getNodeType(node)}`);
	}

	handleDocumentNode( node:Node, context:Context, indent:number)
	{
		let indentString:string = Utils.indent(indent, " ");
		console.log(`${indentString} Handle Document Node: ${node.localName} of Type ${this.getNodeType(node)}`);
	}

	handleNotImplementedNode( node:Node, context:Context, indent:number)
	{
		let indentString:string = Utils.indent(indent, " ");
		console.log(`${indentString} Unimplemented Node Handler: ${this.getNodeType(node)}`);
	}


	handleNode( node:Node, context:Context, indent:number )
	{
		switch( node.nodeType )
		{
			case Node.ATTRIBUTE_NODE:
			{
				this.handleAttributeNode( node, context, indent );
				break;
			}

			case Node.CDATA_SECTION_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.COMMENT_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.DOCUMENT_FRAGMENT_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.DOCUMENT_TYPE_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.ELEMENT_NODE:
			{
				this.handleElementNode( node, context, indent );
				break;
			}

			case Node.ENTITY_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.ENTITY_REFERENCE_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.NOTATION_NODE:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.PROCESSING_INSTRUCTION_NODE:
			{
				// this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.TEXT_NODE:
			{
				// this.handleNotImplementedNode( node, context, indent );
				break;
			}

			case Node.DOCUMENT_NODE:
			{
				this.handleDocumentNode( node, context, indent );
				break;
			}

			default:
			{
				this.handleNotImplementedNode( node, context, indent );
				break;
			}
		}
	}


	traverseNode( node:Node, context:Context, indent:number )
	{
		this.handleNode( node, context, indent);

		if( node.hasChildNodes( ) )
		{
			for( let i=0;i<node.childNodes.length;i++)
			{
				this.traverseNode( node.childNodes.item(i), context, indent + 2);
			}
		}
	}

	getNodeType( node:Node ):string
	{
		let typeString:string = "";

		switch( node.nodeType )
		{
			case Node.ATTRIBUTE_NODE:
			{
				typeString = "ATTRIBUTE_NODE";
				break;
			}

			case Node.CDATA_SECTION_NODE:
			{
				typeString = "CDATA_SECTION_NODE";
				break;
			}

			case Node.COMMENT_NODE:
			{
				typeString = "COMMENT_NODE";
				break;
			}

			case Node.DOCUMENT_FRAGMENT_NODE:
			{
				typeString = "DOCUMENT_FRAGMENT_NODE";
				break;
			}

			case Node.DOCUMENT_TYPE_NODE:
			{
				typeString = "DOCUMENT_TYPE_NODE";
				break;
			}

			case Node.ELEMENT_NODE:
			{
				typeString = "ELEMENT_NODE";
				break;
			}

			case Node.ENTITY_NODE:
			{
				typeString = "ENTITY_NODE";
				break;
			}

			case Node.ENTITY_REFERENCE_NODE:
			{
				typeString = "ENTITY_REFERENCE_NODE";
				break;
			}

			case Node.NOTATION_NODE:
			{
				typeString = "NOTATION_NODE";
				break;
			}

			case Node.PROCESSING_INSTRUCTION_NODE:
			{
				typeString = "PROCESSING_INSTRUCTION_NODE";
				break;
			}

			case Node.TEXT_NODE:
			{
				typeString = "TEXT_NODE";
				break;
			}

			case Node.DOCUMENT_NODE:
			{
				typeString = "DOCUMENT_NODE";
				break;
			}

			default:
			{
				typeString = "UNKNOWN";
				break;
			}
		}

		return typeString;

	}


	dumpNode( node:Node, indent:number ):void
	{
		let indentString:string = Utils.indent(indent, " ");
		let supressNode:boolean = false;
		switch( node.nodeType )
		{
			case Node.ATTRIBUTE_NODE:
			{
				console.log(`${indentString}Node: Type: ATTRIBUTE_NODE Tag:${node.localName}`);
				break;
			}

			case Node.CDATA_SECTION_NODE:
			{
				console.log(`${indentString}Node: Type: CDATA_SECTION_NODE Tag:${node.localName}`);
				break;
			}

			case Node.COMMENT_NODE:
			{
				console.log(`${indentString}Node: Type: COMMENT_NODE Tag:${node.localName}`);
				break;
			}

			case Node.DOCUMENT_FRAGMENT_NODE:
			{
				console.log(`${indentString}Node: Type: DOCUMENT_FRAGMENT_NODE Tag:${node.localName}`);
				break;
			}

			case Node.DOCUMENT_TYPE_NODE:
			{
				console.log(`${indentString}Node: Type: DOCUMENT_TYPE_NODE Tag:${node.localName}`);
				break;
			}

			case Node.ELEMENT_NODE:
			{
				console.log(`${indentString}Node: Type: ELEMENT_NODE Tag:${node.localName}`);
				break;
			}

			case Node.ENTITY_NODE:
			{
				console.log(`${indentString}Node: Type: ENTITY_NODE Tag:${node.localName}`);
				break;
			}

			case Node.ENTITY_REFERENCE_NODE:
			{
				console.log(`${indentString}Node: Type: ENTITY_REFERENCE_NODE Tag:${node.localName}`);
				break;
			}

			case Node.NOTATION_NODE:
			{
				console.log(`${indentString}Node: Type: NOTATION_NODE Tag:${node.localName}`);
				break;
			}

			case Node.PROCESSING_INSTRUCTION_NODE:
			{
				console.log(`${indentString}Node: Type: PROCESSING_INSTRUCTION_NODE Tag:${node.localName}`);
				break;
			}

			case Node.TEXT_NODE:
			{
				supressNode = true;
				//console.log(`${indentString}Node: Type: TEXT_NODE Tag:${node.localName}`);
				break;
			}

			case Node.DOCUMENT_NODE:
			{
				console.log(`${indentString}Node: Type: DOCUMENT_NODE Tag:${node.localName}`);
				break;
			}

			default:
			{
				console.log(`${indentString}Node: Type: UNKNOWN`);
				break;
			}
		}

		if( ! supressNode ) {
			if( node.attributes != null )
			{
				this.dumpNodeAttributes(node, indent + 1);
			}
			if (node.nodeValue != null) {
				let printableValue: string = Utils.makePrintableString(node.nodeValue);
				console.log(`${indentString}Value: ${printableValue}`);
			}

			if (node.childNodes != null) {
				console.log(`${indentString}Children:`);
				for (let i: number = 0; i < node.childNodes.length; i++) {
					let childNode: Node = node.childNodes.item(i);
					this.dumpNode(childNode, indent + 2);
				}
			}
		}
	}
}
