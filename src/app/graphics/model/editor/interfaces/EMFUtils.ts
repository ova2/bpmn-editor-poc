import {ECore} from "./EModelElement";
import EObject = ECore.EObject;
import EPackage = ECore.EPackage;
import {Utils} from "../../../util/Utils";
import EAnnotation = ECore.EAnnotation;
import EClass = ECore.EClass;
import EAttribute = ECore.EAttribute;
import EReference = ECore.EReference;
import EResolvableTypedElement = ECore.EResolvableTypedElement;
export class EMFUtils
{
	private static INSTANCE:EMFUtils = new EMFUtils();

	static getInstance():EMFUtils
	{
		return EMFUtils.INSTANCE;
	}


	dump( eObject:EObject, indent:number )
	{
		let indentString:string = Utils.indent(indent, " ");
		if( eObject instanceof EPackage )
		{
			console.log(`${indentString}EPackage: ${eObject.name} nsPrefix: ${eObject.nsPrefix} nsURI: ${eObject.nsURI}`);

				for( let eAnnotation of eObject.eAnnotations)
				{
					this.dump(eAnnotation, indent + 1);
				}

			for( let eClassifier of eObject.eClassifiers)
			{
				this.dump(eClassifier, indent + 1);
			}
		}

		if( eObject instanceof EAnnotation)
		{
			let contentString:string = "";

			for( let item of eObject.details )
			{
				contentString += `${item.key} = ${item.value} `;
			}


			console.log(`${indentString}EAnnotation: ${eObject.source} ${contentString}`);
		}

		if( eObject instanceof EClass)
		{
			console.log(`${indentString}EClass: ${eObject.name}`);

			for( let eAnnotation of eObject.eAnnotations)
			{
				this.dump(eAnnotation, indent + 1);
			}

			for( let eStructuralFeature of eObject.eStructuralFeatures)
			{
				this.dump(eStructuralFeature, indent + 1);
			}
		}

		if( eObject instanceof EAttribute)
		{
			console.log(`${indentString}EAttribute: ${eObject.name} isID:${eObject.isID}`);
		}

		if( eObject instanceof EReference)
		{
			let dummyType:EResolvableTypedElement = <EResolvableTypedElement> eObject.type;
			console.log(`${indentString}EReference: ${eObject.name} [${eObject.lowerBound},${eObject.upperBound}] eType: ${dummyType.type}`);
		}
	}
}
