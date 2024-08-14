package com.example.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Model;
import com.example.repository.ModelRepository;

@Service
public  class ModelServiceImpl implements ModelService {

    @Autowired
    ModelRepository modelRepository;

    @Override
    public List<Model> getAllModelsByManuIdAndSegId( long segId,long manuID) 
    {
        return modelRepository.findByManufacturerIdAndSegmentId( segId,manuID);
    }
    
    @Override
    public List<Model> getAllModels() 
    {
       return modelRepository.findAll();
    	/*List<Model> mylist=new ArrayList<Model>();
    	Model m1=new Model();
    	mylist.add(m1);
    	return mylist;*/
    }
    
    @Override
    public Model getModelsById(long id) {
        return modelRepository.findById(id).get();
    }
    
}
