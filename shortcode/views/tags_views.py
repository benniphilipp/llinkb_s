from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404

from shortcode.models import Tag

# All User Tags
def get_all_tags(request):
    tags = Tag.objects.filter(user=request.user).values_list('name', flat=True)
    return JsonResponse({'tags': list(tags)})


# Create Tag
class CreateTagView(View):
    def post(self, request, *args, **kwargs):

        tag_name = request.POST.get('tag_name')
        user_id = request.user.id
        
        tag, created = Tag.objects.get_or_create(user_id=user_id, name=tag_name)
        if created:
            return JsonResponse({'message': f'Tag "{tag_name}" wurde erstellt.'}, status=201)
        else:
            return JsonResponse({'message': f'Tag "{tag_name}" existiert bereits.'}, status=400)


#View Tags
def get_all_tags(request):
    tags = Tag.objects.filter(user=request.user).values_list('name', flat=True)
    return JsonResponse({'tags': list(tags)})


# Viwe
class TagDeleteView(View):
    def post(self, request, tag_id):
        tag = get_object_or_404(Tag, id=tag_id)
        tag.delete()
        return JsonResponse({'message': 'Tag deleted successfully'})


class TagListView(View):
    def get(self, request):
        tags = Tag.objects.filter(user=request.user)
        data = [{'id': tag.id, 'name': tag.name} for tag in tags]
        return JsonResponse({'tags': data})

# View Tag Edit
def edit_tag(request, tag_id):
    if request.method == 'POST':
        tag = get_object_or_404(Tag, id=tag_id)
        new_tag_name = request.POST.get('tag_name')
  
        tag.name = new_tag_name
        tag.save()

        return JsonResponse({'message': 'Tag updated successfully.'})