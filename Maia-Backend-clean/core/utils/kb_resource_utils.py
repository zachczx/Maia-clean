from core.models import KbResource
from core.serializers import KbResourceSerializer
from rest_framework.exceptions import ValidationError
from typing import List, Dict, Any

def get_all_kb_resources() -> List[Dict[str, Any]]:
    resources = KbResource.objects.all()
    serializer = KbResourceSerializer(resources, many=True)
    return serializer.data

def create_kb_resource(data: Dict[str, Any]) -> Dict[str, Any]:
    serializer = KbResourceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        raise ValidationError(serializer.errors)

def get_kb_resource_by_id(resource_id: int) -> Dict[str, Any]:
    try:
        resource = KbResource.objects.get(id=resource_id)
        serializer = KbResourceSerializer(resource)
        return serializer.data
    except KbResource.DoesNotExist:
        raise ValidationError({'error': 'Resource not found'})

def update_kb_resource(resource_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
    try:
        resource = KbResource.objects.get(id=resource_id)
        serializer = KbResourceSerializer(resource, data=data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data
        else:
            raise ValidationError(serializer.errors)
    except KbResource.DoesNotExist:
        raise ValidationError({'error': 'Resource not found'})

def delete_kb_resource(resource_id: int) -> Dict[str, str]:
    try:
        resource = KbResource.objects.get(id=resource_id)
        resource.delete()
        return {'status': 'deleted'}
    except KbResource.DoesNotExist:
        raise ValidationError({'error': 'Resource not found'})