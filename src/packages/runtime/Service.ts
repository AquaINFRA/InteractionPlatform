export interface ServiceLifecycleHooks {
    /**
     * Destroys the component.
     * Should clean up all resources used by the component.
     */
    destroy?(): void;

    /*
     * Just used so that this interface is not empty.
     * TypeScript would otherwise throw an 'no common properties' error
     * if one tries to implement this interface without providing any
     * lifecycle hooks.
     */
    toString(): string;
}

export type Service<Interface extends {} = {}> = ServiceLifecycleHooks & Interface;

export type ServiceOptions<References extends {} = {}> = {
    /**
     * References to other services.
     * These are injected by the runtime and match the declared references of the service.
     */
    references: References;

    /**
     * Configuration properties.
     */
    properties: Record<string, unknown>;
};

export type ServiceConstructor<References extends {} = {}, Interface extends {} = {}> = {
    new (options: ServiceOptions<References>): Service<Interface>;
};

export type ServiceLookupResult = FoundService | UnimplementedService | UndeclaredDependency;

export interface FoundService {
    type: "found";
    instance: Service;
}

export interface UndeclaredDependency {
    type: "undeclared";
}

export interface UnimplementedService {
    type: "unimplemented";
}
