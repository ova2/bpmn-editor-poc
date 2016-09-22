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


export class EMFRegistry
{
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

		EMFUtils.getInstance().dump(ePackage, 0);
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
