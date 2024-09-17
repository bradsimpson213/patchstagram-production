first_name = "Brad"
age = 40
x = 34.6

people = ["Brad", "Mike", "Tom"]
brad = {
    "first_name": "Brad",
    "age": 40
}

DAYS = ("Mon", "Tues", "Wed", "Thur", "Fri")
print(DAYS)
DAYS = "Purple"
print(DAYS)

# SCOPE
num = 50
print("Global Scope 1", num)

def function_scope():
    num = 30
    print("Function Scope 1", num)
    num += 10
    print("Function Scope 2", num)   


function_scope()
print("Global Scope 2", num)