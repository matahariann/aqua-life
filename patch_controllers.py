import os

def extract_methods(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract the block from public function result($id) to the end of the class.
    start_str = "    public function result($id)"
    start_idx = content.find(start_str)
    
    # Find the matching closing brace of the class. It's the last '}' in the file.
    end_idx = content.rfind('}')
    
    # We want everything starting from `result` up to right before the class closes.
    methods_block = content[start_idx:end_idx].rstrip()
    
    return methods_block

# Extract from AdminHistory
admin_history_filepath = r"d:\Coolyeahh\Joki\Skripsi Arsyad\pengukur-tingkat-kualitas-perairan-app\app\Http\Controllers\AdminHistory.php"
methods_code = extract_methods(admin_history_filepath)

# Now apply to AdminKelolaStation
admin_kelola_filepath = r"d:\Coolyeahh\Joki\Skripsi Arsyad\pengukur-tingkat-kualitas-perairan-app\app\Http\Controllers\AdminKelolaStation.php"
with open(admin_kelola_filepath, 'r') as f:
    admin_kelola_content = f.read()

# Replace `Result::with` with `\App\Models\Result::with` if needed in methods_code
methods_code_admin = methods_code.replace("Result::with", "\App\Models\Result::with")
methods_code_admin = methods_code_admin.replace("public function update(Request $request, $id)", "public function updateHistory(Request $request, $id)")
methods_code_admin = methods_code_admin.replace('Inertia::render("Admin/History/Result"', 'Inertia::render("Admin/Kelola Station/Result"')
methods_code_admin = methods_code_admin.replace('Inertia::render("Admin/History/Edit"', 'Inertia::render("Admin/Kelola Station/Edit"')

# Insert before the last '}'
end_idx = admin_kelola_content.rfind('}')
new_admin_kelola = admin_kelola_content[:end_idx] + "\n" + methods_code_admin + "\n}\n"

with open(admin_kelola_filepath, 'w') as f:
    f.write(new_admin_kelola)


# Now apply to OperatorKelolaStation
# Wait, for Operator, the original source should probably come from OperatorHistory.
# Let's extract OperatorHistory methods as well, or just modify the Admin's methods.
# The only difference in Operator methods would be the Inertia view paths and perhaps Auth role checks, but the logic is identical.
operator_history_filepath = r"d:\Coolyeahh\Joki\Skripsi Arsyad\pengukur-tingkat-kualitas-perairan-app\app\Http\Controllers\OperatorHistory.php"
with open(operator_history_filepath, 'r') as f:
    operator_history_content = f.read()
    
# Check if OperatorHistory has edit/result methods
if "public function result($id)" in operator_history_content:
    methods_code_op = extract_methods(operator_history_filepath)
    methods_code_op = methods_code_op.replace("Result::with", "\App\Models\Result::with")
    methods_code_op = methods_code_op.replace("public function update(Request $request, $id)", "public function updateHistory(Request $request, $id)")
    methods_code_op = methods_code_op.replace('Inertia::render("Operator/History/Result"', 'Inertia::render("Operator/Kelola Station/Result"')
    methods_code_op = methods_code_op.replace('Inertia::render("Operator/History/Edit"', 'Inertia::render("Operator/Kelola Station/Edit"')

    operator_kelola_filepath = r"d:\Coolyeahh\Joki\Skripsi Arsyad\pengukur-tingkat-kualitas-perairan-app\app\Http\Controllers\OperatorKelolaStation.php"
    with open(operator_kelola_filepath, 'r') as f:
        operator_kelola_content = f.read()
        
    end_idx = operator_kelola_content.rfind('}')
    new_operator_kelola = operator_kelola_content[:end_idx] + "\n" + methods_code_op + "\n}\n"
    
    with open(operator_kelola_filepath, 'w') as f:
        f.write(new_operator_kelola)
else:
    # If OperatorHistory doesn't have it, we just use the Admin's one and replace Admin -> Operator string.
    # Actually let's just do that to be safe.
    print("OperatorHistory doesn't have the methods. Not extracting.")
    
print("Done")
