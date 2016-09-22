import {Utils} from "../../../util/Utils";
import {forEach} from "typescript-collections/dist/lib/arrays";

export namespace ECore {



	export class ECoreFactory {

		private static INSTANCE: ECoreFactory = new ECoreFactory();

		static getInstance(): ECoreFactory {
			return ECoreFactory.INSTANCE;
		}

		parseDocumnet(document: Document): EPackage {
			let ePackage: EPackage = null;
			for (let i = 0; i < document.childNodes.length; i++) {
				let node: Node = document.childNodes.item(i);


				if (node.localName != null && node.localName.toUpperCase() == "EPACKAGE") {
					ePackage = this.parseEPackage(node);
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

		private parseAttributes( node:Node, eObject:EObject )
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
				eObject.isclass = this.getNodeAttributeAsBoolean("class",node);
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

				eObject.type = new EResolvableTypedElement( this.getNodeAttributeAsString("eType",node));
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

		private parseEAnnotation( node:Node ): EAnnotation {
			let eAnnotation: EAnnotation = new EAnnotation();

			eAnnotation.node = node;
			eAnnotation.source = node.attributes.getNamedItem("source").nodeValue;

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


		private parseEAnnotations( eObject:EObject, node:Node)
		{
			// check the node children for EAnnotations
			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE) {
					if( "eAnnotations" == childNode.localName )
					{
						let eAnnotation:EAnnotation = this.parseEAnnotation(childNode);
						eObject["eAnnotations"].push( eAnnotation );
					}
				}
			}
		}
		private parseEClassifier( node:Node ): EClassifier
		{

			let featureType = this.getNodeAttributeAsString("xsi:type", node );

			let eClassifier: EClassifier = <EClassifier> ECoreFactory.createEObjectFromFeatureType( featureType );
			this.parseAttributes(node,eClassifier);
			this.parseEObject( node, eClassifier );

			return eClassifier;
		}


		private parseEClassifiers( eObject:EObject, node:Node)
		{
			// check the node children for EAnnotations
			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE) {
					if( "eClassifiers" == childNode.localName )
					{
						let eClassifiers:EClassifier = this.parseEClassifier(childNode);
						eObject["eClassifiers"].push( eClassifiers );
					}
				}
			}
		}

		private parseEStructuralFeature(node: Node): EStructuralFeature {
			let featureType = node.attributes.getNamedItem("xsi:type").nodeValue;


			let eStructuralFeature: EStructuralFeature = <EStructuralFeature> ECoreFactory.createEObjectFromFeatureType(featureType);

			this.parseAttributes(node,eStructuralFeature);

			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE)
				{
					this.parseEObject( childNode, eStructuralFeature );
				}
			}

			return eStructuralFeature;
		}

		private parseEStructuralFeatures( eObject:EObject, node:Node)
		{
			// check the node children for EAnnotations
			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE) {
					if( "eStructuralFeatures" == childNode.localName )
					{
						let eStructuralFeature:EStructuralFeature = this.parseEStructuralFeature(childNode);
						eObject["eStructuralFeatures"].push( eStructuralFeature );
					}
				}
			}
		}


		private parseEObject(node: Node, eContextObject: EObject)
		{

			this.parseEAnnotations( eContextObject, node);
			this.parseEClassifiers( eContextObject, node);
			this.parseEStructuralFeatures( eContextObject, node);
		}


		private parseEPackage(node: Node): EPackage {
			let ePackage: EPackage = new EPackage();

			ePackage.node = node;
			ePackage.name = this.getNodeAttributeAsString("name", node );
			ePackage.nsPrefix = this.getNodeAttributeAsString("nsPrefix", node );
			ePackage.nsURI = this.getNodeAttributeAsString("nsURI", node );

			this.parseEObject(node, ePackage);



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

		static dumpEObject(eObject: EObject, indent: number): void {
			if (eObject instanceof EPackage) {
				ECoreFactory.dumpEPackage(<EPackage> eObject, indent);
			}
			if (eObject instanceof EClass) {
				ECoreFactory.dumpEClass(<EClass> eObject, indent);
			}
		}


		static dumpEPackage(ePackage: EPackage, indent: number): void {
			console.log(Utils.indent(indent, " ") + "EPackage: " + ePackage.name + " " + ePackage.nsPrefix + " " + ePackage.nsURI);
			if (ePackage.eClassifiers != null) {
				for (let eClassifier of ePackage.eClassifiers) {
					ECoreFactory.dumpEObject(eClassifier, indent + 2);
				}
			}
		}

		static dumpEClass(eClass: EClass, indent: number): void {
			console.log(Utils.indent(indent, " ") + "EClass: " + eClass.name);
		}
	}

	export class EObject {
		node: Node;
	}

	export class EModelElement extends EObject {
		eAnnotations: EAnnotation[] = [];
	}

	export class EAnnotation extends EModelElement {
		source: string;
		details: {key: string,value: string}[] = [];
	}

	export class ENamedElement extends EModelElement
	{
		name: string;
		}

	export class EClassifier extends ENamedElement {
		instanceClassName: string;
		instanceClass: string;
		defaultValue: string;
}

	export class EClass extends EClassifier {
		isAbstract: boolean;
		isclass: boolean;
		superTypes: EClass[] = [];
		eStructuralFeatures: EStructuralFeature[] = [];
		eGenericSuperTyes: EGenericType[] = [];
		eAttributes: EAttribute[] = [];
		eReferences: EReference[] = [];
		eContainments: EReference[] = [];
		eOperations: EOperation[] = [];
	}

	export class EDataType extends EClassifier {
		isSerializable: boolean;
	}

	export class EEnum extends EDataType {
		eEnumLiterals: EEnumLiteral[] = [];
	}


	export class EEnumLiteral extends ENamedElement {
		value: number;
		literal: string;
	}

	export class EPackage extends ENamedElement {
		nsURI: string;
		nsPrefix: string;
		eSubPackages: EPackage[] = [];
		eSuperPackage: EPackage;
		eClassifiers: EClassifier[] = [];
	}

	export class ETypedElement extends ENamedElement {
		isOrdered: boolean;
		isUnique: boolean;
		lowerBound: number;
		upperBound: number;
		isMany: boolean;
		isRequired: boolean;
		type: EClassifier;
		genericType: EGenericType;
	}

	export class EOperation extends ETypedElement {
		eContainingClass: EClass;
		eParameters: EParameter[] = [];
		eExceptions: EClassifier[] = [];
		eGenericExceptions: EGenericType[] = [];
		eTypeParameter: ETypedParameter[] = [];
	}

	export class EParameter extends ETypedElement {
	}

	export class EStructuralFeature extends ETypedElement {
		isTransient: boolean;
		isVolatile: boolean;
		isChangeable: boolean;
		defaultLiteral: string;
		defaultValue: string;
		isUnsettable: boolean;
		isDerived: boolean;
		eContainingClass: EClass;
	}

	export class EAttribute extends EStructuralFeature {
		isID: boolean;
		eDataType: EDataType;
	}

	export class EReference extends EStructuralFeature {
		isContainment: boolean;
		isContainer: boolean;
		isResolveProxies: boolean;
		eOpposite: EReference;
		eReferenceType: EClass;
		eKeys: EAttribute[] = [];
	}


	export class ETypedParameter extends ENamedElement {
		eBounds: EGenericType[] = [];
	}

	export class EGenericType extends  EObject{
		eUpperBound: EGenericType;
		eTypeArguments: EGenericType[] = [];
		eRawType: EClassifier;
		eLowerBound: EGenericType
		eTypeParameter: ETypedParameter[] = [];
		eClassifier: EClassifier;
	}

	export class EResolvableTypedElement extends EClassifier
	{
		constructor( type:string )
		{
			super();
			this.type = type;
		}
		type:string;
	}

	export class InstanceLoader {
		private context: Object;

		constructor(context: Object) {
			this.context = context;
		}

		getInstance(name: string, ...args: any[]) {
			let instance = Object.create(this.context[name].prototype);
			instance.constructor.apply(instance, args);
			return instance;
		}
	}
}




