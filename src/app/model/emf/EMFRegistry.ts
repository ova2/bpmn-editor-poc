import {EPackage} from "./ecore/EPackage";
import {ECoreFactory} from "./ecore/ECoreFactory";
import Dictionary from "typescript-collections/dist/lib/Dictionary";
import {EContext} from "./ecore/internal/EContext";

import {ECoreModel} from "./ecore/internal/ECoreModel";
import {EMFUtils} from "./ecore/EMFUtils";
import {Utils} from "../../graphics/util/Utils";
import {EClassifier} from "./ecore/EClassifier";
import {EClass} from "./ecore/EClass";
import {EDataType} from "./ecore/EDataType";
import {EResolvable} from "./ecore/EResolvable";
import {EObject} from "./ecore/EObject";


export class EMFRegistry
{
	// Array of EResolvable Elements
	private eResolvables: EResolvable[] = [];

	private constructor()
	{
		this.addEMFModelFromXML(ECoreModel.MODEL);
	}

	static getInstance(): EMFRegistry
	{
		return EMFRegistry.INSTANCE;
	}


	addEMFModelFromXML(xmlContent: string)
	{
		let xmlParser: DOMParser = new DOMParser();
		let document: Document = xmlParser.parseFromString(xmlContent, 'text/xml');

		let eContext: EContext = new EContext();

		let ePackage: EPackage = ECoreFactory.getInstance().parseDocumnet(document, eContext);

		this.ePackageMap.setValue(ePackage.nsURI, ePackage);

		for (let eResolvabale of eContext.resolvabelElements)
		{
			console.log("Resolve: " + eResolvabale.getPropertyName() + " as " + eResolvabale.getPropertyValue());
		}

		this.resolve(eContext.resolvabelElements, ePackage);

		EMFUtils.getInstance().dump(ePackage, 0);
	}

	private resolve(eResolvables: EResolvable[], ePackage: EPackage)
	{
		for (let eResolvable of eResolvables)
		{
			if (this.eResolvables.indexOf(eResolvable) == -1)
			{
				this.eResolvables.push(eResolvable);
			}
		}

		// Resolve Stuff
		for (let eResolvable of this.eResolvables)
		{
			if (eResolvable.getEObject() instanceof EClassifier)
			{
				let eClassifier: EClassifier = <EClassifier> eResolvable.getEObject();
				console.log(`Resolve Classifier ${eClassifier.name} ${eResolvable.getPropertyName()} ${eResolvable.getPropertyValue()}`);
				this.findReference(eResolvable.getPropertyValue(), ePackage);
			}

			if (eResolvable.getEObject() instanceof EClass)
			{
				let eClass: EClass = <EClass> eResolvable.getEObject();
				console.log(`Resolve Classifier ${eClass.name} ${eResolvable.getPropertyName()} ${eResolvable.getPropertyValue()}`);
				this.findReference(eResolvable.getPropertyValue(), ePackage);
			}
		}
	}

	private findReference(referenceString: string, localPackage?: EPackage): EObject
	{
		let eObject: EObject = null;
		let packageURLParts = referenceString.split("#");

		let packageURL = null;
		let searchPath = null;

		packageURL = packageURLParts[0];
		searchPath = packageURLParts[1];

		if (localPackage == null && packageURL != null)
		{
			localPackage = this.getPackage(packageURL);
		}

		if (localPackage != null)
		{
			console.log("Have to Search: " + searchPath + " in " + packageURL);
		}


		return eObject;
	}

	getPackage(packageURL: string): EPackage
	{
		return this.ePackageMap.getValue(packageURL);
	}

	showAllPackages(indent: number)
	{
		let indentString: string = Utils.indent(indent, " ");
		for (let packageName of this.ePackageMap.keys())
		{
			let ePackage: EPackage = this.ePackageMap.getValue(packageName);
			console.log(`${indentString} Package: ${ePackage.name} nsPrefix: ${ePackage.nsPrefix} nsURI: ${ePackage.nsURI}`);

			for (let eClassifier of ePackage.eClassifiers)
			{
				if (eClassifier instanceof EClass)
				{
					let eClass: EClass = <EClass> eClassifier;
					if (eClass.isInterface)
					{
						console.log(`${indentString}   Interface: ${eClass.name}`);
					}
				}
			}

			for (let eClassifier of ePackage.eClassifiers)
			{
				if (eClassifier instanceof EClass)
				{
					let eClass: EClass = <EClass> eClassifier;
					if (!eClass.isInterface)
					{
						console.log(`${indentString}   Class: ${eClass.name}`);
					}
				}
			}

			for (let eClassifier of ePackage.eClassifiers)
			{
				if (eClassifier instanceof EDataType)
				{
					let eDataType: EDataType = <EDataType> eClassifier;

					console.log(`${indentString}   DataType: ${eDataType.name}`);

				}
			}
		}
	}


	private ePackageMap: Dictionary < string, EPackage > = new Dictionary<string,EPackage>();

	private static INSTANCE: EMFRegistry = new EMFRegistry();
}
