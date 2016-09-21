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

		private parseEClass(node: Node): EClass {
			let eClass: EClass = new EClass();
			eClass.node = node;
			eClass.name = node.attributes.getNamedItem("name").nodeValue;

			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE) {
					this.parseEObject(childNode, eClass);
				}
			}


			return eClass;

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

		private parseAnnotation( node:Node ): EAnnotation {
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
						let eAnnotation:EAnnotation = this.parseAnnotation(childNode);
						eObject["eAnnotations"].push( eAnnotation );
					}
				}
			}
		}


		private parseEStructuralFeature(node: Node): EStructuralFeature {
			let featureType = node.attributes.getNamedItem("xsi:type").nodeValue;
			let eStructuralFeature: EStructuralFeature = <EStructuralFeature> ECoreFactory.createEObjectFromFeatureType(featureType);

			this.parseEAnnotations(eStructuralFeature, node);

			eStructuralFeature.node = node;


			eStructuralFeature.name = this.getNodeAttributeAsString("name", node);
			eStructuralFeature.isOrdered = this.getNodeAttributeAsBoolean("ordered", node);
			eStructuralFeature.isUnique = this.getNodeAttributeAsBoolean("unique", node);
			eStructuralFeature.lowerBound = this.getNodeAttributeAsNumber("lowerBound", node);
			eStructuralFeature.upperBound = this.getNodeAttributeAsNumber("upperBound", node);
			eStructuralFeature.isMany = this.getNodeAttributeAsBoolean("many", node);
			eStructuralFeature.isRequired = this.getNodeAttributeAsBoolean("required", node);
			// eStructuralFeature.type: EClassifier;
			// eStructuralFeature.genericType: EGenericType;
			eStructuralFeature.isTransient = this.getNodeAttributeAsBoolean("transient", node);
			eStructuralFeature.isVolatile = this.getNodeAttributeAsBoolean("volatile", node);
			eStructuralFeature.isChangeable = this.getNodeAttributeAsBoolean("changeable", node);
			//eStructuralFeature.defaultLiteral = this.getNodeAttributeAsBoolean("ordered", node);
			//eStructuralFeature.defaultValue = this.getNodeAttributeAsBoolean("ordered", node);
			eStructuralFeature.isUnsettable = this.getNodeAttributeAsBoolean("unsettable", node);
			eStructuralFeature.isDerived = this.getNodeAttributeAsBoolean("derived", node);
			// eStructuralFeature.eContainingClass: EClass;

			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);
				if (childNode.nodeType == Node.ELEMENT_NODE) {

				}
			}


			return eStructuralFeature;
		}


		private parseEObject(node: Node, eContextObject: EObject)
		{

			this.parseEAnnotations( eContextObject, node);

			if (node.localName == "eStructuralFeatures") {
				let eStructuralFeature: EStructuralFeature = this.parseEStructuralFeature(node);
				eContextObject["eStructuralFeatures"].push(eStructuralFeature);
			}
		}


		private parseEPackage(node: Node): EPackage {
			let ePackage: EPackage = new EPackage();

			ePackage.node = node;
			ePackage.name = node.attributes.getNamedItem("name").nodeValue;
			ePackage.nsPrefix = node.attributes.getNamedItem("nsPrefix").nodeValue;
			ePackage.nsURI = node.attributes.getNamedItem("nsURI").nodeValue;

			for (let i = 0; i < node.childNodes.length; i++) {
				let childNode: Node = node.childNodes.item(i);

				if (childNode.nodeType == Node.ELEMENT_NODE) {
					console.log("ChildNode: " + childNode.localName);

					if (childNode.localName == "eClassifiers") {
						let classifierType: string = childNode.attributes.getNamedItem("xsi:type").nodeValue;


						if ("ecore:EClass" == classifierType) {
							let eClass: EClass = this.parseEClass(childNode);
							ePackage.eClassifiers.push(eClass);
						}
					}
				}
			}

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
					eObject = new EAttribute();
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

		dump( indent:number )
		{
			console.log(`${Utils.indent(indent, " " )} [.. from EObject] node: ${this.node.localName}`);
		}
	}
	export class EModelElement extends EObject {
		eAnnotations: EAnnotation[] = [];

		dump( indent:number )
		{
			console.log(`${Utils.indent(indent, " " )} [.. from EModelElement]`);
			console.log(`${Utils.indent(indent, " " )} Annotations:`);
			for( let eAnnotation of this.eAnnotations )
			{
				eAnnotation.dump(indent + 1);
			}
			super.dump(indent+1);
		}

	}

	export class EAnnotation extends EModelElement {
		source: string;
		details: {key: string,value: string}[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EAnnotation:`);
			super.dump(indent+1);
		}

	}

	export class ENamedElement extends EModelElement
	{
		name: string;
		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} [.. from ENamedElement] name=${this.name}`);
			super.dump(indent+1);
		}

	}

	export class EClassifier extends ENamedElement {
		instanceClassName: string;
		instanceClass: string;
		defaultValue: string;

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EClassifier:`);
			super.dump(indent+1);
		}

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

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EClass:`);
			super.dump(indent + 1);
		}


	}

	export class EDataType extends EClassifier {
		isSerializable: boolean;

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EDataType:`);
			super.dump(indent + 1);
		}

	}

	export class EEnum extends EDataType {
		eEnumLiterals: EEnumLiteral[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EEnum:`);
			super.dump(indent + 1);
		}

	}


	export class EEnumLiteral extends ENamedElement {
		value: number;
		literal: string;

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EEnumLiteral:`);
			super.dump(indent + 1);
		}
	}

	export class EPackage extends ENamedElement {
		nsURI: string;
		nsPrefix: string;
		eSubPackages: EPackage[] = [];
		eSuperPackage: EPackage;
		eClassifiers: EClassifier[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EPackage:`);
			console.log(`${Utils.indent(indent, " " )} Classifier:`);
			for( let eClassifiers of this.eClassifiers )
			{
				eClassifiers.dump(indent + 1);
			}
			super.dump(indent + 1);
		}

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

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} ETypedElement:`);
			super.dump(indent + 1);
		}
	}

	export class EOperation extends ETypedElement {
		eContainingClass: EClass;
		eParameters: EParameter[] = [];
		eExceptions: EClassifier[] = [];
		eGenericExceptions: EGenericType[] = [];
		eTypeParameter: ETypedParameter[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EOperation:`);
			super.dump(indent + 1);
		}
	}

	export class EParameter extends ETypedElement {

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EParameter:`);
			super.dump(indent + 1);
		}
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

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EStructuralFeature:`);
			super.dump(indent + 1);
		}


	}

	export class EAttribute extends EStructuralFeature {
		isID: boolean;
		eDataType: EDataType;

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EAttribute:`);
			super.dump(indent + 1);
		}

	}

	export class EReference extends EStructuralFeature {
		isContainment: boolean;
		isContainer: boolean;
		isResolveProxies: boolean;
		eOpposite: EReference;
		eReferenceType: EClass;
		eKeys: EAttribute[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EReference:`);
			super.dump(indent + 1);
		}
	}


	export class ETypedParameter extends ENamedElement {
		eBounds: EGenericType[] = [];

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} ETypedParameter:`);
			super.dump(indent + 1);
		}
	}

	export class EGenericType extends  EObject{
		eUpperBound: EGenericType;
		eTypeArguments: EGenericType[] = [];
		eRawType: EClassifier;
		eLowerBound: EGenericType
		eTypeParameter: ETypedParameter[] = [];
		eClassifier: EClassifier;

		dump( indent:number )
		{

			console.log(`${Utils.indent(indent, " " )} EGenericType:`);
			super.dump(indent + 1);
		}
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




