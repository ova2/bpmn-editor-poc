import {EPackage} from "./ecore/EPackage";
import {ECoreFactory} from "./ecore/ECoreFactory";
import {XMLProcessor} from "./XMLProcessor";
import Dictionary from "typescript-collections/dist/lib/Dictionary";
import {EContext} from "./ecore/internal/EContext";
import {EResolvableClassifier} from "./ecore/EResolvableClassifier";

export class EMFRegistry
{
	private constructor()
	{
	}

	static getInstance():EMFRegistry
	{
		return EMFRegistry.INSTANCE;
	}


	addEMFModelFromXML( xmlContent:string )
	{
		let xmlParser:DOMParser = new DOMParser();
		let document:Document = xmlParser.parseFromString( xmlContent, 'text/xml' );

		let eContext:EContext = new EContext();

		let ePackage:EPackage = ECoreFactory.getInstance().parseDocumnet(document, eContext );

		this.ePackageMap.setValue( ePackage.nsURI, ePackage );

		for( let eResolvabale of eContext.resolvabelElements )
		{
			if( eResolvabale instanceof EResolvableClassifier )
			{
				console.log("Resolve Classifier: " + eResolvabale.getPropertyName() + " as " + eResolvabale.getPropertyValue());
			}

		}
	}




	private ePackageMap:Dictionary<string,EPackage> = new Dictionary<string,EPackage>();

	private static INSTANCE:EMFRegistry = new EMFRegistry();
}
