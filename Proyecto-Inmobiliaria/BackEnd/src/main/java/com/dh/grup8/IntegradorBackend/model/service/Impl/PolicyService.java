package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.PolicyDTO;
import com.dh.grup8.IntegradorBackend.model.entity.Policy;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IPolicyRepository;
import com.dh.grup8.IntegradorBackend.model.service.IPolicyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PolicyService implements IPolicyService {

    @Autowired
    IPolicyRepository policyRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public PolicyDTO findById(Long id) throws ResourceNotFoundException {
        Optional<Policy> policy = policyRepository.findById(id);
        if (policy.isPresent()) {
            return modelMapper.map(policy, PolicyDTO.class);
        }
        throw new ResourceNotFoundException("The Policy does not exist");
    }

    @Override
    public PolicyDTO create(PolicyDTO policyDTO) {
        Policy policiSaveResponse = policyRepository.save(mapToEntity(policyDTO));
        PolicyDTO responsePolicyDTO = mapToDTO(policiSaveResponse);
        return responsePolicyDTO;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Policy> policy = policyRepository.findById(id);
        if (!policy.isPresent()) {
            throw new ResourceNotFoundException("The policy with ID " + id + " that you want delete does not exists.");
        }
        policyRepository.deleteById(id);
    }

    @Override
    public PolicyDTO update(PolicyDTO policyDTO) throws ResourceNotFoundException {
        Policy policy = mapToEntity(policyDTO);
        if (policyRepository.existsById(policy.getId())) {
            return mapToDTO(policyRepository.save(policy));
        }
        throw new ResourceNotFoundException("The policy with ID " + policy.getId() + " that you want update does not exists.");
    }

    @Override
    public Set<PolicyDTO> findAll() {
        List<Policy> policy_list = policyRepository.findAll();
        Set<PolicyDTO> policyDTO_list = new HashSet<>();
        for (Policy pol : policy_list) {
            policyDTO_list.add(mapToDTO(pol));
        }
        return policyDTO_list;
    }

    //------ MAPPER ------
    private PolicyDTO mapToDTO(Policy policy) {
        PolicyDTO policyDTO = modelMapper.map(policy, PolicyDTO.class);
        return policyDTO;
    }

    private Policy mapToEntity(PolicyDTO policyDTO) {
        Policy policy = modelMapper.map(policyDTO, Policy.class);
        return policy;
    }
}
