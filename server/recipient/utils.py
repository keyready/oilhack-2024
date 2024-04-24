from io import BytesIO
import pandas as pd
import pickle

good_components = ['blend_id', '6314fabc-8e78-42be-87fb-948ba3bee8f9','a6715883-185b-411b-a05c-cdbb0675d5cd','615537f6-1f8f-4240-a5e9-8f7be344ecd3','b84237b9-d742-481b-a9df-c0f01b1997fa','b26322a8-b4fa-41cc-a755-757b41d22919','0444c588-f816-4b9b-a6dc-f596b021d6e3','abf252e5-fe01-4700-847e-fb782e22b50c','94c6da88-8acb-4198-84c5-4f20642d8605']
good_params = ['blend_id', 'd7651afb-daba-4d99-bab9-ec17ae0f30ca','4ff1ad46-aa06-4344-875e-a1f33ac094a7','5cf8e492-dfea-4ecb-8799-a97989c46256','76287f81-2806-481a-8dc6-7274a761e2f9','049e5cb9-9c20-438c-9ef2-96870712a0be','6778cdc9-8a45-4592-9da9-9670a616ec35','45496a42-6a86-40fd-bdf6-9451c9c0641b','9e2de643-ddca-487e-b9e7-69b25d8662bf','7c8a81df-b7e7-4507-aab1-79a61fce7887','ebe9475f-b29f-4ffd-86af-a16a8321f1ee','e1393ee4-f97f-405d-b4ad-208cb3a46bc0','7fde038e-937b-4420-a4de-daf51b2ab54a','7eef1eae-b625-40f0-bc54-9ee4eb2abeb3','b66d6e5c-747b-46b7-a050-a36acbee020f','161776ad-2131-4557-a1f2-995bacb90bf0','2efb9b14-01bf-43bf-bd8b-bcd4675f040d','bb81c562-5ae1-41cd-817c-0d80e41168ca','227542be-0884-44dd-afbd-cbe2fd8338bf','4c7a51f1-dc82-41dc-92fa-772535c2c70c','9fa62975-847a-469e-bd3e-e0e133141ab0','a915d87d-cf09-4aad-b84a-626778d5c019','90f8d10d-0094-4188-b5de-85b71db78859','9a5290f3-d43b-424f-9a4f-b68c4abf718a','33fd9876-db06-478c-8993-17dd5d9d698a','4e3b4ddc-7a7e-43e6-bd1c-64c4aaa8b2c0','5f1a9612-c626-4f94-8e98-6a103e4f07ef','9e87f31b-a049-464c-bc75-fd17bb9b98b0','e6a39b44-cb14-4221-aaa6-f26fd946e68e']

def processing(bdata, path_to_result):
    df_test = pd.read_csv(BytesIO(bdata))

    df_test_components = pd.pivot(
        df_test[['blend_id','component_name','component_class']].drop_duplicates(),
        index='blend_id',
        columns='component_name',
        values='component_class'
    ).reset_index()
    df_test_components = df_test_components[good_components].drop_duplicates()
    df_test_components = df_test_components.set_index('blend_id')
    df_test_components = df_test_components.fillna(0)
    df_test_components = df_test_components.applymap(lambda x: 1 if x != 0 else 0)
    df_test_components = df_test_components.reset_index()
    
    df_test_params = pd.pivot_table(
        df_test,
        index='blend_id',
        columns='oil_property_param_title',
        values='oil_property_param_value',
        aggfunc='mean'
    ).reset_index()
    df_test_params = df_test_params[good_params].drop_duplicates()
    df_test_params = df_test_params.fillna(-9999)
    
    df_test_types = df_test[['blend_id', 'oil_type']].drop_duplicates()
    dummies_test = pd.get_dummies(df_test_types['oil_type'], prefix='oil_type', drop_first=True)
    df_test_types = df_test_types.drop('oil_type', axis=1)
    df_test_types = pd.concat([df_test_types, dummies_test], axis=1)
    df_test_types = df_test_types.replace({True: 1, False: 0})
    
    df_test_components_params = pd.merge(df_test_components, df_test_params, on="blend_id")
    df_test_res = pd.merge(df_test_components_params, df_test_types, on="blend_id")
    
    df_test_res = df_test_res.set_index('blend_id')
    with open('model.pkl', 'rb') as file:
        loaded_model = pickle.load(file)
    x_test = df_test_res
    predicted = loaded_model.predict(x_test)
    data = pd.DataFrame()
    df_test_res = df_test_res.reset_index()
    data['blend_id']=df_test_res['blend_id']
    data['oil_property_param_value'] = predicted
    data = data.set_index('blend_id')

    data.to_csv(path_to_result)
