export class Permission {
    Permissions: _Permission;
}

export class _Permission{
    Entities: Entity[];
}

export class Entity{
    Id: number;
    Description: string;
    ShortName: string;
    EntityActions: EntityActions[];
}

export class EntityActions{
    Id: number;
    ActionName: string;
    HasPermissio: boolean;
}