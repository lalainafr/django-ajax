from django.shortcuts import render
from .forms import StudentForm

# Create your views here.
def index(request):
    form = StudentForm()
    context = {'form': form}
    return render(request, 'base/index.html', context)