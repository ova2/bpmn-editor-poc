export namespace ECore
{
	export class EModelElement
	{
		eAnnotations: EAnnotation[];
	}

	export class EAnnotation extends EModelElement
	{
		source: string;
		details: {key: string,value: string}[];
	}

	export class ENamedElement extends EModelElement
	{
		name: string;
	}

	export class EClassifier extends ENamedElement
	{
		instanceClassName: string;
		instanceClass: string;
		defaultValue: string;
	}

	export class EClass extends EClassifier
	{
		isAbstract: boolean;
		isclass: boolean;
		superTypes: EClass[];
		eStructuralFeatures: EStructuralFeature[];
		eGenericSuperTyes: EGenericType[];
		eAttributes: EAttribute[];
		eReferences: EReference[];
		eContainments: EReference[];
		eOperations: EOperation[];
	}

	export class EDataType extends EClassifier
	{
		isSerializable: boolean;
	}

	export class EEnum extends EDataType
	{
		eEnumLiterals: EEnumLiteral[];
	}


	export class EEnumLiteral extends ENamedElement
	{
		value: number;
		literal: string;
	}

	export class EPackage extends ENamedElement
	{
		nsURI: string;
		nsPrefix: string;
		eSubPackages: EPackage[];
		eSuperPackage: EPackage;
		eClassifier: EClassifier;

	}

	export class ETypedElement extends ENamedElement
	{
		isOrdered: boolean;
		isUnique: boolean;
		lowerBound: number;
		upperBound: number;
		isMany: boolean;
		isRequired: boolean;
		type: EClassifier;
		genericType: EGenericType;
	}

	export class EOperation extends ETypedElement
	{
		eContainingClass: EClass;
		eParameters: EParameter[];
		eExceptions: EClassifier[];
		eGenericExceptions: EGenericType[];
		eTypeParameter: ETypedParameter[];
	}

	export class EParameter extends ETypedElement
	{

	}

	export class EStructuralFeature extends ETypedElement
	{
		isTransient: boolean;
		isVolatile: boolean;
		isChangeable: boolean;
		defaultLiteral: string;
		defaultValue: string;
		isUnsettable: boolean;
		isDerived: boolean;
		eContainingClass: EClass;
	}

	export class EAttribute extends EStructuralFeature
	{
		isID: boolean;
		eDataType: EDataType;
	}

	export class EReference extends EStructuralFeature
	{
		isContainment: boolean;
		isContainer: boolean;
		isResolveProxies: boolean;
		eOpposite: EReference;
		eReferenceType: EClass;
		eKeys: EAttribute[];
	}


	export class ETypedParameter extends ENamedElement
	{
		eBounds: EGenericType[];
	}

	export class EGenericType
	{
		eUpperBound: EGenericType;
		eTypeArguments: EGenericType[];
		eRawType: EClassifier;
		eLowerBound: EGenericType
		eTypeParameter: ETypedParameter[];
		eClassifier: EClassifier;
	}

	export class InstanceLoader
	{
		private context: Object;

		constructor(context: Object)
		{
			this.context = context;
		}

		getInstance(name: string, ...args: any[])
		{
			let instance = Object.create(this.context[name].prototype);
			instance.constructor.apply(instance, args);
			return instance;
		}
	}
}




