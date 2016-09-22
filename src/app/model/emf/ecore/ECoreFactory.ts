import {EPackage} from "./EPackage";
import {EObject} from "./EObject";
import {EContext} from "./internal/EContext";
import {EModelElement} from "./EModelElement";
import {EAnnotation} from "./EAnnotation";
import {EClassifier} from "./EClassifier";
import {ENamedElement} from "./ENamedElement";
import {EClass} from "./EClass";
import {EDataType} from "./EDataType";
import {EEnum} from "./EEnum";
import {EEnumLiteral} from "./EEnumLiteral";
import {ETypedElement} from "./ETypedElement";
import {EStructuralFeature} from "./EStructuralFeature";
import {EParameter} from "./EParameter";
import {EOperation} from "./EOperation";
import {EAttribute} from "./EAttribute";
import {EReference} from "./EReference";
import {EGenericType} from "./EGenericType";
import {ETypedParameter} from "./ETypedParameter";
import {EResolvable} from "./EResolvable";


export class ECoreFactory {

	private static INSTANCE: ECoreFactory = new ECoreFactory();

	static getInstance(): ECoreFactory {
		return ECoreFactory.INSTANCE;
	}

	parseDocumnet(document: Document, eContext:EContext): EPackage {
		let ePackage: EPackage = null;

		for (let i = 0; i < document.childNodes.length; i++) {
			let node: Node = document.childNodes.item(i);


			if (node.localName != null && node.localName.toUpperCase() == "EPACKAGE") {
				ePackage = this.parseEPackage(node, eContext );
			}
		}



		return ePackage;
	}


	private static createEObjectFromFeatureType(featureType: string): EObject {
		let eObject: EObject = null;

		eObject = ECoreFactory.createInstance(featureType.substr(featureType.indexOf(":") + 1));

		return eObject;
	}

	private getNodeAttributeAsString(attributeName: string, node: Node): string {

		let retString = null;
		if (node.attributes.getNamedItem(attributeName) != null) {
			retString = node.attributes.getNamedItem(attributeName).nodeValue;
		}
		return retString;
	}

	private getNodeAttributeAsBoolean(attributeName: string, node: Node): boolean {

		let retBoolean: boolean = false;
		if (node.attributes.getNamedItem(attributeName) != null) {
			retBoolean = node.attributes.getNamedItem(attributeName).nodeValue == "true";
		}
		return retBoolean;
	}

	private getNodeAttributeAsNumber(attributeName: string, node: Node): number {

		let retNumber: number = 0;
		if (node.attributes.getNamedItem(attributeName) != null) {
			retNumber = Number(node.attributes.getNamedItem(attributeName).nodeValue);
		}
		return retNumber;
	}

	private parseAttributes( node:Node, eObject:EObject, eContext:EContext )
	{
		if( eObject instanceof EObject)
		{
			eObject.node = node;
		}

		if( eObject instanceof EModelElement )
		{
			// has no Attributes
		}

		if( eObject instanceof EAnnotation)
		{
			eObject.source = this.getNodeAttributeAsString("source", node);
		}

		if( eObject instanceof ENamedElement )
		{
			eObject.name = this.getNodeAttributeAsString("name", node);
		}

		if( eObject instanceof EClassifier)
		{
			eObject.instanceClass = this.getNodeAttributeAsString("instanceclassname", node);
			eObject.instanceClass = this.getNodeAttributeAsString("instanceclass", node);
			eObject.defaultValue = this.getNodeAttributeAsString("defaultValue", node);
		}

		if( eObject instanceof  EClass)
		{
			eObject.isAbstract = this.getNodeAttributeAsBoolean("abstract",node);
			eObject.isClass = this.getNodeAttributeAsBoolean("class",node);
			eObject.isInterface = this.getNodeAttributeAsBoolean("interface",node);

			let superTypes = this.getNodeAttributeAsString("eSuperTypes", node );
			if( superTypes != null )
			{
				for( let superType of superTypes.split(" "))
				{
					let eResolvable:EResolvable = new EResolvable(superType, eObject, "eSuperTypes");
					eContext.resolvabelElements.push(eResolvable);
				}
				console.log(superTypes);
			}
		}

		if( eObject instanceof  EDataType)
		{
			eObject.isSerializable = this.getNodeAttributeAsBoolean("serializable",node);
		}

		if( eObject instanceof EEnum)
		{
			// has no Attributes
		}

		if( eObject instanceof EEnumLiteral)
		{
			eObject.literal = this.getNodeAttributeAsString("literal",node);
			eObject.value = this.getNodeAttributeAsNumber("value", node);
		}

		if( eObject instanceof EPackage)
		{
			eObject.nsURI = this.getNodeAttributeAsString("nsURI",node);
			eObject.nsPrefix = this.getNodeAttributeAsString("nsPrefix",node);
		}

		if( eObject instanceof ETypedElement)
		{
			eObject.isOrdered = this.getNodeAttributeAsBoolean("ordered", node);
			eObject.isUnique = this.getNodeAttributeAsBoolean("unique", node);
			eObject.lowerBound = this.getNodeAttributeAsNumber("lowerBound", node);
			eObject.upperBound = this.getNodeAttributeAsNumber("upperBound", node);
			eObject.isMany = this.getNodeAttributeAsBoolean("many", node);
			eObject.isRequired = this.getNodeAttributeAsBoolean("required", node);

			let eResolvable:EResolvable = new EResolvable( this.getNodeAttributeAsString("eType",node), eObject, "eType");
			eContext.resolvabelElements.push( eResolvable);
		}

		if( eObject instanceof EOperation)
		{
			// has no Attributes
		}

		if( eObject instanceof EParameter)
		{
			// has no Attributes
		}

		if( eObject instanceof EStructuralFeature)
		{
			eObject.isTransient = this.getNodeAttributeAsBoolean("transient", node);
			eObject.isVolatile = this.getNodeAttributeAsBoolean("volatile", node);
			eObject.isChangeable = this.getNodeAttributeAsBoolean("changeable", node);
			//eStructuralFeature.defaultLiteral = this.getNodeAttributeAsBoolean("ordered", node);
			//eStructuralFeature.defaultValue = this.getNodeAttributeAsBoolean("ordered", node);
			eObject.isUnsettable = this.getNodeAttributeAsBoolean("unsettable", node);
			eObject.isDerived = this.getNodeAttributeAsBoolean("derived", node);
			// eStructuralFeature.eContainingClass: EClass;
		}

		if( eObject instanceof EAttribute)
		{
			eObject.isID = this.getNodeAttributeAsBoolean("ID",node);
		}

		if( eObject instanceof  EReference)
		{
			eObject.isContainment = this.getNodeAttributeAsBoolean("containment", node);
			eObject.isContainer = this.getNodeAttributeAsBoolean("container", node);
			eObject.isResolveProxies = this.getNodeAttributeAsBoolean("resolveproxies", node);
		}

		if( eObject instanceof ETypedParameter)
		{

		}

		if( eObject instanceof EGenericType)
		{

		}
	}

	private parseEAnnotation( node:Node, eContext:EContext ): EAnnotation {
		let eAnnotation: EAnnotation = new EAnnotation();

		this.parseAttributes( node, eAnnotation, eContext);


		for (let i = 0; i < node.childNodes.length; i++) {
			let childNode: Node = node.childNodes.item(i);
			if (childNode.nodeType == Node.ELEMENT_NODE) {
				if ("details" == childNode.localName) {
					let key: string = childNode.attributes.getNamedItem("key").nodeValue;
					let value: string = childNode.attributes.getNamedItem("value").nodeValue;

					eAnnotation.details.push({key, value});
				}
			}
		}

		return eAnnotation;
	}


	private parseEAnnotations( eObject:EObject, node:Node, eContext:EContext)
	{
		// check the node children for EAnnotations
		for (let i = 0; i < node.childNodes.length; i++) {
			let childNode: Node = node.childNodes.item(i);
			if (childNode.nodeType == Node.ELEMENT_NODE) {
				if( "eAnnotations" == childNode.localName )
				{
					let eAnnotation:EAnnotation = this.parseEAnnotation(childNode, eContext);
					eObject["eAnnotations"].push( eAnnotation );
				}
			}
		}
	}
	private parseEClassifier( node:Node,  eContext:EContext): EClassifier
	{

		let featureType = this.getNodeAttributeAsString("xsi:type", node );

		let eClassifier: EClassifier = <EClassifier> ECoreFactory.createEObjectFromFeatureType( featureType );
		this.parseAttributes(node,eClassifier, eContext);
		this.parseEObject( node, eClassifier, eContext );

		return eClassifier;
	}


	private parseEClassifiers( eObject:EObject, node:Node, eContext:EContext)
	{
		// check the node children for EAnnotations
		for (let i = 0; i < node.childNodes.length; i++) {
			let childNode: Node = node.childNodes.item(i);
			if (childNode.nodeType == Node.ELEMENT_NODE) {
				if( "eClassifiers" == childNode.localName )
				{
					let eClassifiers:EClassifier = this.parseEClassifier(childNode, eContext);
					eObject["eClassifiers"].push( eClassifiers );
				}
			}
		}
	}

	private parseEStructuralFeature(node: Node, eContext:EContext): EStructuralFeature {
		let featureType = node.attributes.getNamedItem("xsi:type").nodeValue;


		let eStructuralFeature: EStructuralFeature = <EStructuralFeature> ECoreFactory.createEObjectFromFeatureType(featureType);

		this.parseAttributes(node,eStructuralFeature, eContext);

		for (let i = 0; i < node.childNodes.length; i++) {
			let childNode: Node = node.childNodes.item(i);
			if (childNode.nodeType == Node.ELEMENT_NODE)
			{
				this.parseEObject( childNode, eStructuralFeature, eContext );
			}
		}

		return eStructuralFeature;
	}

	private parseEStructuralFeatures( eObject:EObject, node:Node, eContext:EContext)
	{
		// check the node children for EAnnotations
		for (let i = 0; i < node.childNodes.length; i++) {
			let childNode: Node = node.childNodes.item(i);
			if (childNode.nodeType == Node.ELEMENT_NODE) {
				if( "eStructuralFeatures" == childNode.localName )
				{
					let eStructuralFeature:EStructuralFeature = this.parseEStructuralFeature(childNode, eContext);
					eObject["eStructuralFeatures"].push( eStructuralFeature );
				}
			}
		}
	}


	private parseEObject(node: Node, eContextObject: EObject, eContext:EContext)
	{

		this.parseEAnnotations( eContextObject, node, eContext);
		this.parseEClassifiers( eContextObject, node, eContext);
		this.parseEStructuralFeatures( eContextObject, node, eContext);
	}


	private parseEPackage(node: Node, eContext:EContext): EPackage {
		let ePackage: EPackage = new EPackage();

		ePackage.node = node;
		ePackage.name = this.getNodeAttributeAsString("name", node );
		ePackage.nsPrefix = this.getNodeAttributeAsString("nsPrefix", node );
		ePackage.nsURI = this.getNodeAttributeAsString("nsURI", node );

		this.parseEObject(node, ePackage, eContext);



		return ePackage;
	}

	static createInstance(className: string): EObject {
		let eObject: EObject = null;
		switch (className.toUpperCase()) {

			case "EOBJECT": {
				eObject = new EObject();
				break;
			}

			case "EATTRIBUTE": {
				eObject = new EAttribute();
				break;
			}

			case "EREFERENCE": {
				eObject = new EReference();
				break;
			}


			case "EANNOTATION": {
				eObject = new EAnnotation();
				break;
			}

			case "ECLASS": {
				eObject = new EClass();
				break;
			}

			case "EDATATYPE": {
				eObject = new EDataType();
				break;
			}

			case "EPARAMETER": {
				eObject = new EParameter();
				break;
			}

			case "EPACKAGE": {
				eObject = new EPackage();
				break;
			}


			case "EOPERATION": {
				eObject = new EOperation();
				break;
			}

			case "EENUM": {
				eObject = new EEnum();
				break;
			}

			case "EENUMLITERAL": {
				eObject = new EEnumLiteral();
				break;
			}

			default: {
				console.error("ECoreFactory: Unknown Class: " + className);
			}
		}

		return eObject;
	}

}
