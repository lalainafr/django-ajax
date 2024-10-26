from django.shortcuts import render
from base.forms import StudentForm
from . models import Student
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    form = StudentForm()
    stu = Student.objects.all()
    context = {'form': form, 'stu': stu}
    return render(request, 'base/index.html', context)

# preventing csrf attack
@csrf_exempt
def save_data(request):
    if request.method =='POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            # assign the value of the form content - 'name:...' in the browser    
            name = request.POST['name']
            email = request.POST['email']
            course = request.POST['course']

            # create an instance of Student
            s = Student(name=name, email=email, course=course)
            
            s.save()
            
            # --> PUT INT THE TABLE INT THE RIGHT SIDE THE DATA REVEICED FROM THE AJAX CALL
            # take the values of all student data in the database
            stu = Student.objects.values()
            # convert it to python list
            student_data = list(stu)
            
            # return to json as well the data converted as a python list
            return JsonResponse({'status': 'Data saved', 'student_data': student_data})
        else: 
            return JsonResponse({'status': 'Unable to save'})

@csrf_exempt
def delete_data(request):
    if request.method == 'POST':
        # requete POST à partir de l'AJAX
        id = request.POST.get('student_id')
        s = Student.objects.get(pk=id)
        s.delete()
        return JsonResponse({'status':1})
    else: 
        return JsonResponse({'status':0})
        
        
        